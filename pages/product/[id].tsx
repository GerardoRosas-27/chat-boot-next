import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { routesApi } from 'src/environment/routesApi';
import { responseGeneral } from '@interfaces/response';
import fetch from 'isomorphic-unfetch'
import { productsDTO } from '@interfaces/products';
import { DetailProduct } from '@components/DetailProduct';

const PageProduct = (): JSX.Element => {
  const { id } = useRouter().query;

  const initialState: productsDTO = {
    name: '',
    category: '',
    description: '',
    propertis: [],
    img: ''
  }
  const [product, setproduct] = useState<productsDTO>(initialState)


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${routesApi.product}/${id}`);
      const data: responseGeneral<productsDTO[]> = await response.json()
      setproduct(data.body[0])
    }
    fetchData().catch(console.error)
  }, [])
  return (

    <DetailProduct newProduct={false} product={product}></DetailProduct>
  )
}
export default PageProduct
