export interface initialModel{
    _id?: string
    keywords: string[];
    key: string;
}

export interface responseModel{
    _id?: string
    key: string;
    replyMessage: string[];
    media?: string;
    trigger?: string;
}