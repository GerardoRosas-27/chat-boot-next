import { useEffect, useState } from "react"
import { routesApi } from "../environment/routesApi";
import { productsDTO } from "../interfaces/products";
import { responseGeneral } from "../interfaces/response";
import { DetailProduct } from "./DetailProduct";
import * as React from 'react';
//table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
//modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { classColumn } from "src/helperts/setColumn";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'auto',
    p: 4,
};

const ListProducts = (): JSX.Element => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [producList, setProductList] = useState<productsDTO[]>([]);
    const [selesctProduct, setSelesctProduct] = useState<productsDTO>({
        name: '',
        category: '',
        description: '',
        propertis: [],
        img: ''
    });
    let product = selesctProduct
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const onDetailProduct = (data: productsDTO) => {
        console.log("data: ", data);
        setSelesctProduct(data);
        setOpen(true);
    }

    useEffect(() => {
        window.
            fetch(routesApi.product)
            .then((response) => response.json())
            .then((dataResponse: responseGeneral<productsDTO[]>) => {
                console.log(dataResponse);

                setProductList(dataResponse.body)
            })
    }, [])


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {producList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow onClick={() => onDetailProduct(row)} hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell component="th" scope="row">{row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                        <TableCell align="right">{row.img}</TableCell>
                                        <TableCell align="right"> <img src={'./chat_boot/' + row.img} alt="" /> </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <style jsx>
                    {`
                img{
                 width: 20%;
                 height: auto;
                }
            `}
                </style>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={producList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                       Detalle del producto
                    </Typography>
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


                    </div>
                    <style jsx>
                        {`
                          .c-p{
                               padding: 5%;
                            }
                           .row textarea, .row input{
                                    width: 100%;                
                              }
       
                           img{
                                 width: 100%;
                               height: auto;
                                }
                       `}
                    </style>
                </Box>
            </Modal>

        </Paper>
    );
}

export default ListProducts