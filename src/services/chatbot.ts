import { initialModel, responseModel } from "../models/chatbot";
import { createResponse, searchInitials, searchResponse, searchResponses } from "./bd.chatbot";


export async function postResponse(data: responseModel): Promise<responseModel> {
    let response = await createResponse(data);
    return response
}
export async function getInitials(): Promise<initialModel[]> {
    let response = await searchInitials();
    return response
}

export async function getResponse(key: string): Promise<responseModel[]> {
    let response = await searchResponse(key);
    return response
}
export async function getResponses(): Promise<responseModel[]> {
    let response = await searchResponses();
    return response
}
