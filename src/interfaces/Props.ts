import { productsDTO } from "./products";

export interface PropsProduct{
    product: productsDTO
}
export interface Props<T>{
    status: T;
}