import { productsDTO } from "./products";

export interface PropsProduct{
    product: productsDTO;
    newProduct: boolean;
}

export interface DataProps<T>{
    data: T;
}