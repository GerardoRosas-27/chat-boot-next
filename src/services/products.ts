import { productsDTO } from "../interfaces/products";

export function getProduct(id?: string): productsDTO[] {
    if (id) {
        return dataDumi().filter(item => item._id === id);
    } else {
        return []
    }
}

export function getProducts(): productsDTO[] {
    return dataDumi();
}

function dataDumi() {
    return [
        {
            _id: "123",
            name: "portafolio",
            category: "Portafolio",
            description: "Portafolio de mesclilla de niño",
            propertis: [{ size: "mediano", price: 50.00 }]
        },
        {
            _id: "234sdf",
            name: "portafolio",
            category: "Portafolio",
            description: "Portafolio de mesclilla de niño",
            propertis: [{ size: "mediano", price: 50.00 }]
        }
    ]
}