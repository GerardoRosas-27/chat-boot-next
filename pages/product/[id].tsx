import React from 'react'
import { useRouter } from 'next/router';
import { DetailProduct } from '@components/DetailProduct';

const PageProduct = (): JSX.Element => {
  const route = useRouter()
  console.log('route: ', route)
  const id = route.query.id as string;

  return (
    <div>
      {id ? <DetailProduct newProduct={false} id={id}></DetailProduct> : null}
    </div>
  )
}
export default PageProduct
