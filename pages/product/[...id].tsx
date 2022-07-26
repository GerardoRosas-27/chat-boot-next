import React from 'react'
import { useRouter } from 'next/router';
import { DetailProduct } from '@components/detailProduct/DetailProduct';
import { AcctionProduct } from 'src/environment/constan';

const PageProduct = (): JSX.Element => {
  const route = useRouter()
  console.log("route: ", route)
  const query = route.query.id as string[];
  const id = query && query.length > 0 ? query[1] : null;
  const type = query && query.length > 0 ? query[0] : null;

  return (
    <div>
      {id ? <DetailProduct newProduct={AcctionProduct.NEW_PRODUCT === type ? true : false} id={id}></DetailProduct> : null}
    </div>
  )
}
export default PageProduct
