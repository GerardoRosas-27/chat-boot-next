import mongoose, { model } from "mongoose";
import { productsModel, propertisModel } from "../../models/products";

const Schema = mongoose.Schema;

var propsSchema = new Schema<propertisModel>({
  size: { type: String, required: true },
  price: { type: Number, required: true },
});

const productsSchema = new Schema<productsModel>({
  data_name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  propertis: [propsSchema]
});
export const Products = mongoose.models.Products || model<productsModel>("Products", productsSchema);