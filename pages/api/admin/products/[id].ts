// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { productsDTO } from "../../../../src/interfaces/products";
import { responseGeneral } from '../../../../src/interfaces/response';
import { getProduct } from '../../../../src/services/products';

let responseGeneral: responseGeneral<productsDTO[]>;


export default function product(
    req: NextApiRequest,
    res: NextApiResponse<responseGeneral<productsDTO[]>>
) {
    const { id } = req.query;
    responseGeneral = {
        staus: 200,
        body: getProduct(id.toString()),
        message: "Get initials"
    }
    res.status(200).json(responseGeneral);
}




