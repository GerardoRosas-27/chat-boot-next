import { productsModel } from "../models/products";
import { createProducts, searchProductByID, searchProducts, removeProduct, updateProduct } from "./bd.service";

export async function postProduct(data: productsModel): Promise<productsModel> {
    let response = await createProducts(data);
    console.log("service product: ", response);
    return response
}

export async function getProducts(): Promise<productsModel[]> {
    let response = await searchProducts();
    return response
}

export async function getProduct(id: string): Promise<productsModel> {
    let response = await searchProductByID(id);
    return response
}
export async function deleteProduct(id: string): Promise<productsModel> {
    let response = await removeProduct(id);
    return response
}
export async function putProduct(id: string, data: productsModel): Promise<productsModel | null> {
    let response = await updateProduct(id, data);
    console.log("update result:", response);
    if (response.modifiedCount === 1) {
        return { _id: id, ...data }
    } else {
        return null
    }
}

