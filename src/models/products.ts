import { Schema } from "mongoose";
type ObjectId = Schema.Types.ObjectId;

export interface productsModel {
    _id?: string
    data_name: string;
    category: string;
    description: string;
    propertis: propertisModel[];
    img: string;
}
export interface propertisModel {
    _id?: string
    size: string;
    price: number;
}