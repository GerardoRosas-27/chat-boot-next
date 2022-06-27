import mongoose, { model } from "mongoose";
import { productsModel, propertisModel } from "../../models/products";

const Schema = mongoose.Schema;

var propsSchema = new Schema<propertisModel>({
  size: { type: String, required: true },
  price: { type: Number, required: true },
});

const productsSchema = new Schema<productsModel>({
  data_name: { type: String, required: true },
  category: { type: String, required: false },
  description: { type: String, required: false },
  propertis: [propsSchema],
  img: { type: String, required: true }
});
export const Products = mongoose.models.products || model<productsModel>("products", productsSchema);