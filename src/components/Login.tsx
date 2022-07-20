import { productsDTO } from '@interfaces/products'
import React from 'react'
import { classColumn, setColumnRow } from 'src/helperts/setColumn'

export const Login = () => {
  return (
    <div className="row">
      <div style={classColumn('sm-1-6 lg-1-9')}>
        <div className="row">
          <div style={classColumn('md-1-6')}>
            <label htmlFor="">Usiario:</label>
            <input type="text" />
          </div>
          <div style={classColumn('md-7-12')}>
            <label htmlFor="">Contraseña:</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div style={classColumn('sm-7-12 lg-10-12')}>
        <img src="./chat_boot/model-1.jpeg" alt="" />
      </div>

      <style jsx>
        {`
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

