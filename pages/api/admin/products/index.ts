import type { NextApiRequest, NextApiResponse } from 'next'
import { EntityListProductsToListProductsDTO, EntityProductsToProductDTO, ProductDTOToEntityProducts } from '../../../../src/converters/products';
import type { productsDTO } from "../../../../src/interfaces/products";
import { responseGeneral } from '../../../../src/interfaces/response';
import { getProducts, postProduct } from '../../../../src/services/products';

let responseGeneral: responseGeneral<productsDTO[]>;


export default async function products(
    req: NextApiRequest,
    res: NextApiResponse<responseGeneral<productsDTO[]>>
) {
    console.log("method: ", req.method);
    switch (req.method) {
        case 'GET':
            let getData = await getProducts();
            console.log("get Data: ", getData)
            responseGeneral = {
                staus: 200,
                body: EntityListProductsToListProductsDTO(getData),
                message: "Get initials"
            }
            res.status(200).json(responseGeneral);
            break;
        case 'POST':
            console.log("entro POST: ");
            let response = await postProduct(ProductDTOToEntityProducts(req.body));
            console.log("response api post: ", response);
            responseGeneral = {
                staus: 200,
                body: [EntityProductsToProductDTO(response)],
                message: "Create product"
            }
            res.status(200).json(responseGeneral);
            break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)

    }

}

