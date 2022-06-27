import { connection } from "../bd/connection/bd";
import { initialModel, responseModel } from "../models/chatbot";

import { HydratedDocument } from 'mongoose';
import { Initials } from "../bd/schemas/initials";
import { DataResponse } from "../bd/schemas/response";


export async function createInitial(data: initialModel) {
    let connet = await connection();
    console.log("save: ", data);
    const instance: HydratedDocument<initialModel> = new Initials(data);
    let response = await instance.save();
    connet.disconnect();
    console.log("response save: ", response);
    return response
}
export async function createResponse(data: responseModel) {
    let connet = await connection();
    console.log("save: ", data);
    const instance: HydratedDocument<responseModel> = new DataResponse(data);
    let response = await instance.save();
    connet.disconnect();
    console.log("response save: ", response);
    return response
}

export async function searchInitials() {
    let connet = await connection();
    let response = await Initials.find({});
    connet.disconnect();
    return response
}
export async function searchResponse(key: string) {
    let connet = await connection();
    let response = await DataResponse.find({ key: key });
    connet.disconnect();
    return response
}
export async function searchResponses() {
    let connet = await connection();
    let response = await DataResponse.find({});
    connet.disconnect();
    return response
}

