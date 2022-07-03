// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { EntityListProductsToListProductsDTO } from '../../../../../src/converters/products';
import type { productsDTO } from "../../../../../src/interfaces/products";
import { responseGeneral } from '../../../../../src/interfaces/response';
import { getProductsQuery } from '../../../../../src/services/products';

let responseGeneral: responseGeneral<productsDTO[]>;


export default async function product(
    req: NextApiRequest,
    res: NextApiResponse<responseGeneral<productsDTO[]>>
) {

    const { id } = req.query;
    console.log("method: ", req.method);
    switch (req.method) {
        case 'GET':
            try {
                console.log("buscar: ", id);
                let getData = await getProductsQuery(id.toString());
                console.log("get Data: ", getData)
                responseGeneral = {
                    staus: 200,
                    body: EntityListProductsToListProductsDTO(getData),
                    message: "Get initials"
                }
                res.status(200).json(responseGeneral);
            } catch (error) {
                responseGeneral = {
                    staus: 500,
                    body: [],
                    message: "No se pudo encontrar el dato"
                }
                res.status(500).json(responseGeneral);
            }

            break;
       
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)

    }


}




