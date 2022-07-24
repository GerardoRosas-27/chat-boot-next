import React, { useEffect, useState } from 'react'
import ListProducts from '@components/ListProducts'
import { routesApi } from 'src/environment/routesApi';
import { responseGeneral } from '@interfaces/response';
import { productsDTO } from '@interfaces/products';

const Products = () => {

    const [producList, setProductList] = useState<productsDTO[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${routesApi.product}`);
            const data: responseGeneral<productsDTO[]> = await response.json()
            setProductList(data.body)
        }
        fetchData().catch(console.error)
    }, [])


    return (
        <ListProducts data={producList}></ListProducts>
    )
}
export default Products;
