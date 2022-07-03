import type { NextApiRequest, NextApiResponse } from 'next'
import { responseGeneral } from '../../../../src/interfaces/response';
import { initialModel } from '../../../../src/models/chatbot';
import { getInitials, postInitials } from '../../../../src/services/chatbot';

let responseGeneral: responseGeneral<initialModel[]>;


export default async function initials(
    req: NextApiRequest,
    res: NextApiResponse<responseGeneral<initialModel[]>>
) {
    console.log("method: ", req.method);
    switch (req.method) {
        case 'GET':
            let getData = await getInitials();
            console.log("get Data: ", getData)
            responseGeneral = {
                staus: 200,
                body: getData,
                message: "Get initials"
            }
            res.status(200).json(responseGeneral);
            break;
        case 'POST':
            console.log("entro POST: ");
            let response = await postInitials(req.body);
            console.log("response api post: ", response);
            responseGeneral = {
                staus: 200,
                body: [response],
                message: "Create initials"
            }
            res.status(200).json(responseGeneral);
            break;

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)

    }

}

