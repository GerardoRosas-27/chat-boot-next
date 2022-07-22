import { productsDTO } from '@interfaces/products'
import React from 'react'
import { classColumn, setColumnRow } from 'src/helperts/setColumn'
import { PropsProduct, Props } from '@interfaces/Props';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { UploadImg } from './upload/UploadImg';

const customWidth = {
  width: '100%',
  height: 'auto'
}

export const DetailProduct = (props: PropsProduct) => {
  const { product, open, onClose, newProduct } = props;

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
    <div>
      <Dialog maxWidth={'lg'}
        open={open}
        onClose={onClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{newProduct ? 'Nuevo modelo' : 'Actualizar Modelo'}</DialogTitle>
        <DialogContent dividers={true}>

          <Grid container direction="row" spacing={2}>
            <Grid item p={2} sm={6} md={7} lg={8} xl={9}>
              <Grid container direction="row" spacing={1}>
                <Grid item p={2} md={12}>
                  <TextField style={customWidth} value={product.name} id="standard-basic" label="Nombre" variant="standard" />
                </Grid>
                <Grid item p={2} md={12}>
                  <TextField style={customWidth} value={product.category} id="standard-basic" label="Cateoria" variant="standard" />
                </Grid>
                {listItems(product)}
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
                newProduct ? <UploadImg></UploadImg> : <img style={customWidth} src={'./chat_boot/' + product.img} alt="" />
              }
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>


    </div>

  )
}

