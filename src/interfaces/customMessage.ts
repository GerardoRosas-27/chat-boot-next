import { MessageMedia } from "whatsapp-web.js";

export interface CustomMessage {
    hasQuotedMsg: boolean;
    hasMedia: boolean;
    body: string;
    downloadMedia: () => Promise<MessageMedia>,
    quotedMsg: {
        body: string,
        caption: string
    }
}
