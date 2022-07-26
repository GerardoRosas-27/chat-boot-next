import { productsDTO } from "./products";

export interface PropsProduct{
    id: string;
    newProduct: boolean;
}

export interface DataProps<T>{
    data: T;
}