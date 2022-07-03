import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '../../../src/environment/dev';
const qrcode = require('qrcode-terminal');
import { saveMedia } from "../../../src/chat_boot/controllers/save";
const mimeDb = require('mime-db');
const { Client, Buttons, MessageMedia } = require('whatsapp-web.js');
require('dotenv').config()
const fs = require('fs');
import { createClient, isValidNumber, generateImage } from '../../../src/chat_boot/controllers/handle';
import { connectionReady, connectionLost } from '../../../src/chat_boot/controllers/connection'
import { getInitials, getResponse, postResponse } from '../../../src/services/chatbot';
import { responseMessageProduct, responseModel } from '../../../src/models/chatbot';
import { keyChatBot } from '../../../src/environment/constan';
import { getProduct, getProducts, getProductsQuery, postProduct, putProduct } from '../../../src/services/products';
import { productsModel, propertisModel } from '../../../src/models/products';

const MULTI_DEVICE = environment.MULTI_DEVICE;
const SESSION_FILE_PATH = './session.json';

let client = new Client();
let sessionData;

let activeBot = true;
let activeSearch = false;
let activeAdmin = false;
let activeCreate = false;
let addFild = '';
let productId = '';

interface ResponseChat {
    message: string
}

export default async function chat(
    req: NextApiRequest,
    res: NextApiResponse<ResponseChat>
) {
    (fs.existsSync(SESSION_FILE_PATH) && MULTI_DEVICE === false) ? withSession() : withOutSession();
    res.redirect(environment.url);
}



/**
 * Revisamos si tenemos credenciales guardadas para inciar sessio
 * este paso evita volver a escanear el QRCODE
 */
const withSession = () => {
    console.log(`Validando session con Whatsapp...`)
    sessionData = require(SESSION_FILE_PATH);
    client = new Client(createClient(sessionData, true));

    client.on('ready', () => {
        connectionReady()
        listenMessage();
    });

    client.on('auth_failure', () => connectionLost())

    client.initialize();
}

/**
 * Generamos un QRCODE para iniciar sesion
 */
const withOutSession = () => {
    console.log('No tenemos session guardada');
    console.log([
        '🙌 El core de whatsapp se esta actualizando',
        '🙌 para proximamente dar paso al multi-device',
        '🙌 falta poco si quieres estar al pendiente unete',
        '🙌 http://t.me/leifermendez',
        '🙌 Si estas usando el modo multi-device se generan 2 QR Code escanealos',
        '🙌 Ten paciencia se esta generando el QR CODE',
        '________________________',
    ].join('\n'));

    client = new Client(createClient());

    client.on('qr', (qr: any) => generateImage(qr, () => {
        qrcode.generate(qr, { small: true });
        console.log(`Ver QR http://localhost:3000/`)
        //socketEvents.sendQR(qr)
    }))

    client.on('ready', (a: any) => {
        connectionReady()
        listenMessage()
        // socketEvents.sendStatus(client)
    });

    client.on('authenticated', (session: any) => {

        sessionData = session;
        console.log("entro authenticated: ", sessionData);
        if (sessionData) {
            fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err: any) {
                if (err) {
                    console.log(`Ocurrio un error con el archivo: `, err);
                }
            });
        }
    });

    client.initialize();
}

async function listenMessage() {
    client.on('message', async (msg: any) => {
        const { from, body, hasMedia } = msg;
        if (!isValidNumber(from)) {
            return
        }
        if (from === 'status@broadcast') {
            return
        }


        let message = body.toLowerCase();

        let step = await getMessages(message);

        if (step) {
            if (step === keyChatBot.STEP_0) {
                activeBot = false;
            }
            if (step === keyChatBot.STEP_1) {
                activeBot = true;
                activeSearch = false;
                activeAdmin = false;
                activeCreate = false;
            }
            if (step === keyChatBot.SEARCH) {
                activeSearch = true;
            }
            if (step === keyChatBot.ADMIN) {
                activeAdmin = true;
                activeSearch = false;
                activeCreate = false;
            }
            if (step === keyChatBot.CREATE) {
                activeAdmin = true;
                activeSearch = false;
                activeCreate = true
            }


            if (activeBot) {
                await stepSendMessage(client, from, step);
                return
            }

        } else {
            if (environment.DEFAULT_MESSAGE && activeBot) {

                if (activeSearch) {
                    let dataProducts = await getProducts();
                    let search = message;
                    dataProducts = await dataProducts.filter(item => item.data_name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search) || item.description.toLowerCase().includes(search) || getSizeAndPriceSearch(item.propertis, search))
                    if (dataProducts && dataProducts.length > 0) {
                        await sendProducts(client, from, dataProducts);
                        await sendGeneralStep(client, from, keyChatBot.SEARCH)
                    } else {
                        await sendGeneralStep(client, from, keyChatBot.NOT_FONT)
                    }
                } else {
                    if (activeAdmin) {
                        await sendAdmin(hasMedia, msg, client, from);
                        return
                    } else {
                        await sendGeneralStep(client, from, keyChatBot.DEFAULT)
                        await sendButtons(client, from)
                    }
                }
                return
            }
        }
    });
}
function getSizeAndPriceSearch(data: propertisModel[], search: string) {
    let dataResponse: propertisModel[] = [];
    dataResponse = data.filter(item => item.size.toLowerCase().includes(search) || item.price.toString().includes(search));
    if (dataResponse.length > 0) {
        return true
    } else {
        return false
    }
}

async function stepSendMessage(client: any, from: string, step: string) {

    let response = await responseMessages(step);
    await client.sendMessage(from, response.replyMessage);
    if (response.trigger && response.trigger === keyChatBot.PRODUCTS) {
        let dataProducts = await getProducts()
        if (dataProducts && dataProducts.length > 0) {
            await sendProducts(client, from, dataProducts);
        }
        return
    }
    return

}
function getSizeAndPrice(data: propertisModel[]): string {
    let response = "";
    if (data.length > 1) {
        response = `*Precios*:\n${data.map(i => `${i.size}, ${i.price} 💵💴💶\n`)}`
    } else {
        response = `${data.map(i => `${i.size}, ${i.price} 💵💴💶\n`)}`
    }
    return response
}

async function sendProducts(client: any, from: string, dataProducts: productsModel[]) {
    await dataProducts.map(async item => {
        let replyMessage: string = [`*Nombre*: ${item.data_name}🎒`, `${getSizeAndPrice(item.propertis)}`, `*Categoria*: ${item.category}`, `${item.description}`].join('\n');
        const file = `${environment.urImg}/${item.img}`;
        if (fs.existsSync(file)) {
            const media = MessageMedia.fromFilePath(file);
            await client.sendMessage(from, replyMessage, { sendAudioAsVoice: false, media: media });
            
        }
    })
    return
}

async function getMessages(message: string) {
    let stepsInitial = await getInitials();
    const { key } = stepsInitial.find(k => k.keywords.includes(message)) || { key: null }
    const response = key || null;
    return response
}


async function responseMessages(step: string) {
    let response = await getResponse(step);
    let dataResponse = {
        id: response[0]._id,
        key: response[0].key,
        replyMessage: response[0].replyMessage.join(''),
        media: response[0].media,
        trigger: response[0].trigger
    }
    return dataResponse
}


async function sendAdmin(hasMedia: any, msg: any, client: any, from: string) {
    console.log("save media msg: ", msg)
    if (hasMedia) {

        try {
            const media = await msg.downloadMedia();
            const extensionProcess = mimeDb[media.mimetype]
            const ext = extensionProcess.extensions[0]
            let name = msg.body.toLowerCase();
            const fileSave = `${environment.urImg}/${name.split(' ').join('_')}.${ext}`;
            const file = `${name.split(' ').join('_')}.${ext}`;
            await saveMedia(media, fileSave);
            let dataSave: productsModel = {
                data_name: name,
                category: '',
                description: '',
                propertis: [],
                img: file
            }
            let dataResponse = await postProduct(dataSave);
            if (dataResponse._id) {
                productId = dataResponse._id
                await client.sendMessage(from, dataResponse._id);
                await sendGeneralStep(client, from, keyChatBot.ADD_CATEGORY);
                addFild = keyChatBot.ADD_CATEGORY
                return
            } else {
                await sendGeneralStep(client, from, keyChatBot.ERROR_SAVE);
                return
            }
        } catch (error) {
            console.log(error)
            await sendGeneralStep(client, from, keyChatBot.ERROR_SAVE);
            return
        }

    } else {
        let message = msg.body
        let id = ''
        if (msg && msg.quotedMsg && msg.quotedMsg.body) {
            id = msg.quotedMsg.body
        } else {
            id = productId
        }
        try {
            let responseGetProduct = await getProduct(id)
            if (activeCreate) {
                if (addFild === keyChatBot.ADD_CATEGORY) {
                    if (message && message.length > 0) {
                        responseGetProduct.category = message
                    }
                    await putProduct(id, responseGetProduct)
                    addFild = keyChatBot.ADD_DESCRIPTION
                    await sendGeneralStep(client, from, addFild)
                    return
                }
                if (addFild === keyChatBot.ADD_DESCRIPTION) {
                    if (message && message.length > 0) {
                        responseGetProduct.description = message
                    }
                    await putProduct(id, responseGetProduct)

                    addFild = keyChatBot.ADD_SIZE_PRICE
                    await sendGeneralStep(client, from, addFild)
                    return
                }
                if (addFild === keyChatBot.ADD_SIZE_PRICE) {
                    if (message && message.length > 0) {
                        let messageDivider = message.split(',')
                        responseGetProduct.propertis.push({ size: messageDivider[0], price: messageDivider[1] })
                    }
                    await putProduct(id, responseGetProduct)
                    addFild = keyChatBot.ADD_SIZE_PRICE
                    await sendGeneralStep(client, from, addFild)
                    return
                }
                return
            }
            return
        } catch (error) {
            console.log(error)
            await sendGeneralStep(client, from, keyChatBot.ERROR_SAVE);
            return
        }
    }
}

async function sendGeneralStep(client: any, from: string, step: string) {
    let response = await responseMessages(step);
    await client.sendMessage(from, response.replyMessage);
    return
}





async function sendButtons(client: any, from: string) {

    let buttons = [
        { "body": "Cursos" },
        { "body": "Youtube" },
        { "body": "Telegram" }
    ]

    let button = new Buttons("mensaje bootones", [...buttons]);
     await client.sendMessage(from, button);
    return
}



