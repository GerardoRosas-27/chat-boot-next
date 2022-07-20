import { productsDTO } from "./products";

export interface PropsProduct{
    product: productsDTO;
    open: any;
    onClose: any;
}
export interface Props<T>{
    status: T;
}