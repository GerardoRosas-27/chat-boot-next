import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '../../../src/environment/dev';
const qrcode = require('qrcode-terminal');
const { Client, Buttons, MessageMedia } = require('whatsapp-web.js');
require('dotenv').config()
const fs = require('fs');
import { createClient, isValidNumber, generateImage } from '../../../src/chat_boot/controllers/handle';
import { connectionReady, connectionLost } from '../../../src/chat_boot/controllers/connection'
import { getInitials, getResponse } from '../../../src/services/chatbot';
import { responseMessageProduct, responseModel } from '../../../src/models/chatbot';
import { keyChatBot } from '../../../src/environment/constan';
import { getProducts } from '../../../src/services/products';
import { propertisModel } from '../../../src/models/products';

const MULTI_DEVICE = environment.MULTI_DEVICE;
const SESSION_FILE_PATH = './session.json';

let client = new Client();
let sessionData;

let activeBot = true;
let activeSearch = false;

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
        console.log('Body Message: ', msg.body);
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
            }
            if (step === keyChatBot.SEARCH) {
                activeSearch = true;
            }


            if (activeBot) {
                await stepSendMessage(client, from, step);
                return
            }

        } else {
            console.log("entro sendMessaeDefault: ", step)
            sendMessaeDefault(client, from);
        }
    });
}

async function stepSendMessage(client: any, from: string, step: string) {

    let response = await responseMessages(step);
    await client.sendMessage(from, response.replyMessage);
    if (response.trigger && response.trigger === keyChatBot.PRODUCTS) {
        await sendProducts(client, from);
        return
    }
    return

}
function getSizeAndPrice(data: propertisModel[]): string {
    let response = "";
    if (data.length > 1) {
        response = `*Precios*:\n${data.map(i => `*Tamaño*: ${i.size}, ${i.price} 💵💴💶\n`)}`
    } else {
        response = `${data.map(i => `${i.size}, ${i.price} 💵💴💶\n`)}`
    }
    return response
}

async function sendProducts(client: any, from: string, search?: string) {
    let dataProducts = search ? await getProducts() : await getProducts();
    await dataProducts.map(async item => {
        let replyMessage: string = [`*Nombre*: ${item.data_name}🎒`, `${getSizeAndPrice(item.propertis)}`, `*Categoria*: ${item.category}`, `${item.description}`].join('\n');
        const file = `${environment.urImg}/${item.img}`;
        console.log("url Img: ", file);
        if (fs.existsSync(file)) {
            console.log("entro send Img: ", file);
            const media = MessageMedia.fromFilePath(file);
            await client.sendMessage(from, media, { sendAudioAsVoice: false });
            await client.sendMessage(from, replyMessage);
            return
        }
        return
    })
    return
}

async function getMessages(message: string) {
    let stepsInitial = await getInitials();
    console.log("searchs stepsInitial: ", stepsInitial);
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

async function sendMessaeDefault(client: any, from: string) {
    let response = await responseMessages(keyChatBot.DEFAULT);
    client.sendMessage(from, response.replyMessage);
}

async function sendButtons(client: any, from: string) {

    let buttons = [
        { "body": "Cursos" },
        { "body": "Youtube" },
        { "body": "Telegram" }
    ]

    let button = new Buttons("mensaje bootones", [...buttons], "titulo B", "footer B");
    let response = await client.sendMessage(from, button);
    console.log("botton: ", response);

}



