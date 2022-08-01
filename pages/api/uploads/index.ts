import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import { ApiResponse } from '@models/ApiResponse';

interface NextConnectApiRequest extends NextApiRequest {
    files: Express.Multer.File[];
}
type ResponseData = ApiResponse<string[], string>;

const oneMegabyteInBytes = 1000000;
const outputFolderName = './public/chat_boot';

const upload = multer({
    limits: { fileSize: oneMegabyteInBytes * 2 },
    storage: multer.diskStorage({
        destination: './public/chat_boot',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
    /*fileFilter: (req, file, cb) => {
      const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(file.mimetype);
  
      cb(null, acceptFile);
    },*/
});

const apiRoute = nextConnect({
    onError(error: any, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post((req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    console.log("request: ", req.files);
    res.status(200).json({ data: [req.files[0].originalname] });
});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;
