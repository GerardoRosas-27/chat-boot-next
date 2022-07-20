import React from 'react'
import { useRouter } from 'next/router';

 const DetailProduct = (): JSX.Element => {
    const { id } = useRouter().query;
  return (
    <div>DetailProduct: {id}</div>
  )
}
export default DetailProduct
