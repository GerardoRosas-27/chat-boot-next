export interface initialDTO{
    id?: string
    keywords: string[];
    key: string;
}

export interface responseDTO{
    id?: string
    key: string;
    replyMessage: string[];
    keycontent?: string;
    media?: string;
    trigger?: string;
}