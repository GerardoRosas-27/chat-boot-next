import { connection } from "../bd/connection/bd";
import { productsModel, propertisModel } from "../models/products";
import { Products } from "../bd/schemas/products";
import { HydratedDocument } from 'mongoose';


export async function createProducts(data: productsModel) {
  await connection();
  console.log("save: ", data);
  const instance: HydratedDocument<productsModel> = new Products(data);
  let response = await instance.save();
  console.log("response save: ", response);
  return response
}
export async function searchProducts() {
  let connet = await connection();
  let response = await Products.find({});
  connet.disconnect();
  console.log("searchProducts: ", response);
  return response
}
export async function searchProductByID(id: string) {
  let connet = await connection();
  let response = await Products.findById(id).exec();
  connet.disconnect();
  console.log("searchProductByID: ", response);
  return response
}
export async function searchProductQuery(search: string) {
  let connet = await connection();
  search = search.toLowerCase();
  let response = await Products.find({});

  response = await response.filter(item => item.data_name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search) || item.description.toLowerCase().includes(search) || getSizeAndPrice(item.propertis, search))

  connet.disconnect();
  console.log("searchProductQuery: ", response);
  return response
}
function getSizeAndPrice(data: propertisModel[], search: string) {
  let dataResponse: propertisModel[] = [];
  dataResponse = data.filter(item => item.size.toLowerCase().includes(search) || item.price.toString().includes(search));
  if (dataResponse.length > 0) {
    return true
  } else {
    return false
  }
}
export async function removeProduct(id: string) {
  let connet = await connection();
  let response = await Products.findByIdAndRemove(id).exec();
  connet.disconnect();
  return response;
}
export async function updateProduct(id: string, data: productsModel) {
  let connet = await connection();
  let response = await Products.updateOne({ _id: id }, data).exec();
  connet.disconnect();
  return response;
}

