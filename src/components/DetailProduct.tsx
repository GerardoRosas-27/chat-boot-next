import { productsDTO } from '@interfaces/products'
import React from 'react'
import { classColumn, setColumnRow } from 'src/helperts/setColumn'
import { PropsProduct, Props } from '@interfaces/Props';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const DetailProduct = (props: PropsProduct) => {
  const { product, open, onClose } = props;

  const initial = () => {
    console.log("open: ", open);
    console.log("product: ", product);
    console.log("onClose: ", onClose);
  }
  initial();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
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
          </Box>
        </Fade>
      </Modal>
    </div>

  )
}

