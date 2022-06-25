export interface productsDTO {
    _id?: string; 
    name: string;
    category: string;
    description: string;
    propertis: propertis[];
}
export interface propertis {
    size: string; 
    price: number;
}