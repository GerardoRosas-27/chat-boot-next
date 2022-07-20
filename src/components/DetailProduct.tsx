import { productsDTO } from '@interfaces/products'
import React from 'react'
import { classColumn, setColumnRow } from 'src/helperts/setColumn'
import { PropsProduct } from '@interfaces/Props';

export const DetailProduct = (props: PropsProduct) => {

  const { product } = props;
  return (
    <div className="row">
      <div className='c-p' style={classColumn('sm-1-6 lg-1-9')}>
        <div className="row">
          <div className='c-p' style={classColumn('md-1-6')}>
            <p>Nombre</p>
            <input type="text" value={product.name} />
          </div>
          <div className='c-p' style={classColumn('md-7-12')}>
            <p>Descripción</p>
            <textarea>{product.description}</textarea>
          </div>
        </div>
      </div>



      <div className='c-p' style={classColumn('sm-7-12 lg-10-12')}>
        <p>{product.img}</p>
        <img src={'./chat_boot/' + product.img} alt="" />
      </div>

      <style jsx>
        {`
        .c-p{
          padding: 5%;
        }
        .row textarea, .row input{
          width: 100%;
          
        }
        label {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.8;
        }
        img{
          width: 100%;
          height: auto;
        }
      `}
      </style>
    </div>
  )
}

