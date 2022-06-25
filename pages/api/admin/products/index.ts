import type { NextApiRequest, NextApiResponse } from 'next'
import type { productsDTO } from "../../../../src/interfaces/products";
import { responseGeneral } from '../../../../src/interfaces/response';
import { getProducts } from '../../../../src/services/products';

let responseGeneral: responseGeneral<productsDTO[]>;


export default function products(
    req: NextApiRequest,
    res: NextApiResponse<responseGeneral<productsDTO[]>>
) {
    const { id } = req.query;
    responseGeneral = {
        staus: 200,
        body: getProducts(),
        message: "Get initials"
    }
    res.status(200).json(responseGeneral);
}