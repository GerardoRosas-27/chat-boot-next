import mongoose, { model } from "mongoose";
import { initialModel } from "../../models/chatbot";

const Schema = mongoose.Schema;

let initialSchema = new Schema<initialModel>({
    keywords: [{ type: String, required: true }],
    key:  { type: String, required: true }
});


export const Initials = mongoose.models.initials || model<initialModel>("initials", initialSchema);