import { productsDTO } from '@interfaces/products'
import React, { useEffect, useState } from 'react'
import { PropsProduct } from '@interfaces/Props';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { UploadImg } from './upload/UploadImg';
import { routesApi } from 'src/environment/routesApi';
import { responseGeneral } from '@interfaces/response';

const customWidth = {
  width: '100%',
  height: 'auto'
}

export const DetailProduct = (props: PropsProduct) => {
  const { id, newProduct } = props;


  const productIni: productsDTO = {
    name: '',
    category: '',
    description: '',
    propertis: [{ id: '0', size: '', price: 0 }],
    img: ''
  }

  const [product, setproduct] = useState<productsDTO>(productIni)
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await fetch(`${routesApi.product}/${id}`);
        const data: responseGeneral<productsDTO[]> = await response.json()
        setproduct(data.body[0])
      }
      fetchData().catch(erro => {
        console.log("erro> ", erro)
        setproduct(productIni)
      })
    }

  }, [])

  const listItems = (product: productsDTO) => {
    return product.propertis.map(item => {
      return (
        <Grid container direction="row" key={item.id}>
          <Grid item p={2} md={12}>
            <TextField style={customWidth} value={item.size} id="standard-basic" label="Tamaño" variant="standard" />
          </Grid>
          <Grid item p={2} md={12}>
            <TextField style={customWidth} value={item.price} id="standard-basic" label="Precio" variant="standard" />
          </Grid>
        </Grid>
      )
    })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container direction="row" spacing={2}>
          <Grid item p={2} sm={6} md={7} lg={8} xl={9}>
            <Grid container direction="row" spacing={1}>
              <Grid item p={2} md={12}>
                <TextField style={customWidth} value={product.name} id="standard-basic" label="Nombre" variant="standard" />
              </Grid>
              <Grid item p={2} md={12}>
                <TextField style={customWidth} value={product.category} id="standard-basic" label="Cateoria" variant="standard" />
              </Grid>
              <Grid item p={2} md={12}>
                {listItems(product)}
              </Grid>
              <Grid item p={2} md={12}>
                <TextField style={customWidth}
                  id="filled-multiline-static"
                  label="Descripción"
                  multiline
                  rows={4}
                  defaultValue={product.description}
                  variant="filled"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item p={2} sm={6} md={5} lg={4} xl={3}>
            <p>{product.img}</p>
            {
              newProduct ? <UploadImg></UploadImg> : <img style={customWidth} src={'../chat_boot/' + product.img} alt="" />
            }
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Button>Cancel</Button>
          <Button>Subscribe</Button>
        </Grid>

      </Container>
    </React.Fragment>
  )
}

