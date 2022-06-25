export interface responseGeneral<T> {
    message: string;
    staus: number;
    body: T;
}