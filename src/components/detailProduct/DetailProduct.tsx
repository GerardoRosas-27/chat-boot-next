import { productsDTO, propertisDTO } from '@interfaces/products'
import React, { useEffect, useState } from 'react'
import { PropsProduct } from '@interfaces/Props';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import { UploadImg } from '../upload/UploadImg';
import { routesApi } from 'src/environment/routesApi';
import { responseGeneral } from '@interfaces/response';
import { useRouter } from 'next/router'
import { postProductService, putProductService } from '@services/product.services';
import Alert from '@mui/material/Alert';

const customWidth = {
  width: '100%',
  height: 'auto'
}

export const DetailProduct = (props: PropsProduct) => {
  const { id, newProduct } = props;
  const router = useRouter();

  const product: productsDTO = {
    id: '',
    name: '',
    category: '',
    description: '',
    propertis: [{ id: '0', size: '', price: 0 }],
    img: ''
  }
  const [updateId, setUpdateId] = useState<string>(product.id as string);
  const [name, setName] = useState<string>(product.name);
  const [category, setCategory] = useState<string>(product.category);
  const [propertis, setPropertis] = useState<propertisDTO[]>(product.propertis);
  const [description, setDescription] = useState<string>(product.description);
  const [img, setImg] = useState<string>(product.img);

  const onNameChange = (e: any) => setName(e.target.value);
  const onCategoryChange = (e: any) => setCategory(e.target.value);
  const onDescriptionChange = (e: any) => setDescription(e.target.value);
  const onPropertis = (data: propertisDTO[]) => setPropertis(data);
  const onImgChange = (e: any) => setImg(e.target.value);

  useEffect(() => {
    if (id && !newProduct) {
      const fetchData = async () => {
        const response = await fetch(`${routesApi.product}/${id}`);
        const result: responseGeneral<productsDTO[]> = await response.json()
        const data = result.body[0];
        setUpdateId(data.id as string)
        setName(data.name);
        setCategory(data.category);
        setDescription(data.description);
        setPropertis(data.propertis);
        setImg(data.img);
      }
      fetchData().catch(erro => {
        console.log("erro: ", erro)
      })
    }

  }, [])
  console.log("id: ", id)
  console.log("product: ", product)

  const onAddImg = (img: string): void => {
    console.log("data event img: ", img);
    setImg(img);
  }

  const onCancel = () => {
    router.push({
      pathname: '/product/'
    })
  }

  const onGuardar = async () => {
    let data: productsDTO = {
      name, category, description, img,
      propertis: [{ size: "Unico", price: 70 }]
    }
    if (newProduct) {
      const response = await postProductService(data);

      if (response.staus == 200) {
        router.push({
          pathname: '/product/'
        })
      }
    } else {
      const response = await putProductService(updateId, data);
      if (response.staus == 200) {
        router.push({
          pathname: '/product/'
        })
      }
    }

  };

  const listItems = (propertis: propertisDTO[]) => {
    return propertis.map(item => {
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
      <Container maxWidth="md">
        <Grid container direction="row" spacing={2}>
          <Grid item p={2} sm={6} md={7} lg={8} xl={9}>
            <Grid container direction="row" spacing={1}>
              <Grid item p={2} md={12}>
                <Item>
                  <TextField style={customWidth} value={name} onChange={onNameChange} id="outlined-basic" label="Nombre" variant="standard" />

                </Item>
              </Grid>
              <Grid item p={2} md={12}>
                <TextField style={customWidth} value={category} onChange={onCategoryChange} id="standard-basic" label="Cateoria" variant="standard" />
              </Grid>
              <Grid item p={2} md={12}>
                {listItems(propertis)}
              </Grid>
              <Grid item p={2} md={12}>
                <TextField style={customWidth}
                  id="filled-multiline-static"
                  label="Descripción"
                  multiline
                  rows={4}
                  value={description} onChange={onDescriptionChange}
                  variant="filled"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item p={2} sm={6} md={5} lg={4} xl={3}>
            <p>{img}</p>
            {
              <UploadImg data={img} event={onAddImg}></UploadImg>
            }
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Button onClick={() => onCancel()} variant="outlined">Cancelar</Button>
          <Button onClick={() => onGuardar()} style={{ marginLeft: '10px' }} variant="contained">Guardar</Button>
        </Grid>

      </Container>
    </React.Fragment>
  )
}

