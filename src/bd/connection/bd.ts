import mongoose from 'mongoose';
import { environment }  from '../../environment/dev'


export async function connection() {
   const conection = await mongoose.connect(environment.urlBd + environment.nameBd );
   console.log("connection Bd: ", conection);
    return conection
}