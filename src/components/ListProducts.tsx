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
//new product
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';

const ListProducts = (): JSX.Element => {
    const [newProduct, setNewProduct] = React.useState(false);
    //useState modal
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialogName, setOpenDialog] = React.useState<boolean>();
    //useState table
    const [producList, setProductList] = useState<productsDTO[]>([]);
    const [selesctProduct, setSelesctProduct] = useState<productsDTO>({
        name: '',
        category: '',
        description: '',
        propertis: [],
        img: ''
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    //events modal
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const closeDialog = () => {
        setOpenDialog(false);
    };

    //events table
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
        setNewProduct(false);
        setOpenDialog(true);
        handleClose();
    }

    const onNewProduct = () => {
        let data: productsDTO = {
            name: "",
            category: "",
            description: "",
            propertis: [],
            img: ""
        }
        setSelesctProduct(data);
        setNewProduct(true);
        setOpenDialog(true);
        handleClose();
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

            <Grid container direction="row" spacing={2}>
                <Grid item p={2} sm={6} md={7} lg={8} xl={9}>
                    <Fab onClick={() => onNewProduct()} color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>

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

            <DetailProduct newProduct={newProduct} product={selesctProduct} open={openDialogName} onClose={closeDialog}></DetailProduct>

        </Paper>
    );
}

export default ListProducts