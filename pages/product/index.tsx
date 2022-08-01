import React, { useEffect, useState } from 'react'
import ListProducts from '@components/listProduct/ListProducts'
import { routesApi } from 'src/environment/routesApi';
import { responseGeneral } from '@interfaces/response';
import { productsDTO } from '@interfaces/products';
import { SkeletonList } from '@components/listProduct/SkeletonList';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Products = () => {

    const [producList, setProductList] = useState<productsDTO[]>([]);
    const [loading, setloading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${routesApi.product}`);
            const data: responseGeneral<productsDTO[]> = await response.json()
            setProductList(data.body)
            setloading(true);
        }
        fetchData().catch(error => {
            setloading(true);
        })
    }, [])


    return (


        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                {loading ? <ListProducts data={producList}></ListProducts> :  <SkeletonList/>}

            </Container>
        </React.Fragment>


    )
}
export default Products;
