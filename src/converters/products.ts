import { productsDTO, propertisDTO } from "../interfaces/products";
import { productsModel, propertisModel } from "../models/products";

export function EntityListProductsToListProductsDTO(data: productsModel[]): productsDTO[] {
    return data.map(item => EntityProductsToProductDTO(item));

}
export function EntityProductsToProductDTO(data: productsModel): productsDTO {
    return {
        id: data._id,
        name: data.data_name,
        category: data.category,
        description: data.description,
        propertis: data.propertis.map(item => EntityPropsProductsToPropsProductsDTO(item)),
        img: data.img
    }
}
export function EntityPropsProductsToPropsProductsDTO(data: propertisModel): propertisDTO {
    return {
        id: data._id,
        size: data.size,
        price: data.price,
    }
}
export function ProductDTOToEntityProducts(data: productsDTO): productsModel {
    return {
        data_name: data.name,
        category: data.category,
        description: data.description,
        propertis: data.propertis.map(item => PropsProductsDTOToEntityPropsProducts(item)),
        img: data.img
    }
}
export function PropsProductsDTOToEntityPropsProducts(data: propertisDTO): propertisModel {
    return {
        size: data.size,
        price: data.price,
    }
}