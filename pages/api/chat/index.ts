import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '../../../src/environment/dev';
const qrcode = require('qrcode-terminal');
const { Client, Buttons } = require('whatsapp-web.js');
require('dotenv').config()
const fs = require('fs');
import { createClient, isValidNumber, generateImage } from '../../../src/chat_boot/controllers/handle';
import { connectionReady, connectionLost } from '../../../src/chat_boot/controllers/connection'

const MULTI_DEVICE = environment.MULTI_DEVICE || 'true';
const SESSION_FILE_PATH = './session.json';

let client = new Client();
let sessionData;

var activeBoot = true;
var activeBuscar = false;



interface ResponseChat {
    message: string
}

export default async function chat(
    req: NextApiRequest,
    res: NextApiResponse<ResponseChat>
) {
    (fs.existsSync(SESSION_FILE_PATH) && MULTI_DEVICE === 'false') ? withSession() : withOutSession();
    res.redirect("http://localhost:3000/");
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
        if (msg.body === 'hola' || 'Hola') {

            if (isValidNumber(from)) {
                if (body === '1') {
                    client.sendMessage(msg.from, 'menu de opciones 1');
                } else {
                    client.sendMessage(msg.from, 'mensaje nuevo');
                }
            }

        }
    });
}
