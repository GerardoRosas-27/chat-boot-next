import type { NextApiRequest, NextApiResponse } from 'next'
import { responseGeneral } from '../../../../src/interfaces/response';
import { responseModel } from '../../../../src/models/chatbot';
import { getResponse } from '../../../../src/services/chatbot';

let responseGeneral: responseGeneral<responseModel[]>;


export default async function response(
    req: NextApiRequest,
    res: NextApiResponse<responseGeneral<responseModel[]>>
) {
    console.log("method: ", req.method);
    let { id } = req.query;
    switch (req.method) {
        case 'GET':
            let getData = await getResponse(id.toString());
            console.log("get Data: ", getData)
            responseGeneral = {
                staus: 200,
                body: getData,
                message: "Get initials"
            }
            res.status(200).json(responseGeneral);
            break;
        
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)

    }

}

