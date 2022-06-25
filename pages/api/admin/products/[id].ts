// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { EntityProductsToProductDTO, ProductDTOToEntityProducts } from '../../../../src/converters/products';
import type { productsDTO } from "../../../../src/interfaces/products";
import { responseGeneral } from '../../../../src/interfaces/response';
import { deleteProduct, getProduct, putProduct } from '../../../../src/services/products';

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
                let getData = await getProduct(id.toString());
                console.log("get Data: ", getData)
                responseGeneral = {
                    staus: 200,
                    body: [EntityProductsToProductDTO(getData)],
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
        case 'DELETE':
            try {
                let deleteData = await deleteProduct(id.toString());
                console.log("get Data: ", deleteData)
                responseGeneral = {
                    staus: 200,
                    body: [EntityProductsToProductDTO(deleteData)],
                    message: "delete product"
                }
                res.status(200).json(responseGeneral);
            } catch (error) {
                responseGeneral = {
                    staus: 500,
                    body: [],
                    message: "No se pudo eliminar el dato"
                }
                res.status(500).json(responseGeneral);
            }

            break;
        case 'PUT':
            try {
                let putData = await putProduct(id.toString(), ProductDTOToEntityProducts(req.body));
                console.log("put Data: ", putData)
                responseGeneral = {
                    staus: 200,
                    body: putData ? [EntityProductsToProductDTO(putData)] : [],
                    message: "put produt"
                }
                res.status(200).json(responseGeneral);
            } catch (error) {
                responseGeneral = {
                    staus: 500,
                    body: [],
                    message: "No se pudo actualizar el dato"
                }
                res.status(500).json(responseGeneral);
            }

            break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)

    }


}




