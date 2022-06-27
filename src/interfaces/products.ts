export interface productsDTO {
    id?: string; 
    name: string;
    category: string;
    description: string;
    propertis: propertisDTO[];
    img: string;
}
export interface propertisDTO {
    id?: string;
    size: string; 
    price: number;
}