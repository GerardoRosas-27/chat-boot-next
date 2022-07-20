import { useEffect, useState } from "react"
import { routesApi } from "../environment/routesApi";
import { productsDTO } from "../interfaces/products";
import { responseGeneral } from "../interfaces/response";
import { DetailProduct } from "./DetailProduct";


const ListProducts = (): JSX.Element => {

    const [producList, setProductList] = useState<productsDTO[]>([]);

    useEffect(() => {
        window.
            fetch(routesApi.product)
            .then((response) => response.json())
            .then((dataResponse: responseGeneral<productsDTO[]>) => {
                console.log(dataResponse);

                setProductList(dataResponse.body)
            })
    }, [])


    return (
        <>
            <h1>Hoa Mundo</h1>
            {producList.map((product) => (
                <DetailProduct product={product}></DetailProduct>
            ))
            }
        </>
    )
}

export default ListProducts