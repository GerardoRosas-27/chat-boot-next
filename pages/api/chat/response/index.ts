import type { NextApiRequest, NextApiResponse } from 'next'
import { responseGeneral } from '../../../../src/interfaces/response';
import { responseModel } from '../../../../src/models/chatbot';
import { getResponses, postResponse } from '../../../../src/services/chatbot';

let responseGeneral: responseGeneral<responseModel[]>;


export default async function response(
    req: NextApiRequest,
    res: NextApiResponse<responseGeneral<responseModel[]>>
) {
    console.log("method: ", req.method);
    switch (req.method) {
        case 'GET':
            let getData = await getResponses();
            console.log("get Data: ", getData)
            responseGeneral = {
                staus: 200,
                body: getData,
                message: "Get responses"
            }
            res.status(200).json(responseGeneral);
            break;
        case 'POST':
            console.log("entro POST: ");
            let response = await postResponse(req.body);
            console.log("response api post: ", response);
            responseGeneral = {
                staus: 200,
                body: [response],
                message: "Create product"
            }
            res.status(200).json(responseGeneral);
            break;

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)

    }

}

