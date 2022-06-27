import mongoose, { model } from "mongoose";
import { responseModel } from "../../models/chatbot";

const Schema = mongoose.Schema;

let responseSchema = new Schema<responseModel>({
    key: { type: String, required: true },
    replyMessage: [{ type: String, required: true }],
    media: { type: String, required: false },
    trigger: { type: String, required: false },
});


export const DataResponse = mongoose.models.dataresponses || model<responseModel>("dataresponses", responseSchema);