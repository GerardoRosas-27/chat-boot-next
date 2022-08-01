import { productsDTO, propertisDTO } from "../../interfaces/products";
import { DataProps } from "@interfaces/Props";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
//table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
//icons acciones
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import { AcctionProduct } from "src/environment/constan";
import { deleteProductService, postProductService } from "@services/product.services";


const ListProducts = (props: DataProps<productsDTO[]>): JSX.Element => {
    const { data } = props;
    const router = useRouter()
    //useState table
    const [products, setProducts] = useState<productsDTO[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setProducts(data)
    }, [data])


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
        router.push({
            pathname: '/product/[...id]',
            query: { id: [AcctionProduct.UPDATE_PRODUCT, data.id ? data.id : ''] }
        })
    }


    const onDeleteProduct = async (id: string) => {
        const response = await deleteProductService(id);
        if (response.staus == 200) {
            let data = products.filter(item => item.id !== id);
            setProducts(data);
        }
    };

    const onNewProduct = () => {
        router.push({
            pathname: '/product/[...id]',
            query: { id: [AcctionProduct.NEW_PRODUCT, '0'] }
        })
    }

    const PropertiComponent = (data: propertisDTO[]) => {
        return data.map(item => {
            return (
                <p key={item.id}>
                    <strong>
                        {item.size}:&nbsp;
                    </strong>
                    {item.price}
                </p>
            )
        })

    }


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>

            <Grid container direction="row" justifyContent="flex-end" spacing={2}>
                <Grid item p={2} md={1} sm={2}>
                    <Fab onClick={() => onNewProduct()} color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>

            <TableContainer sx={{ maxHeight: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Categoria</TableCell>
                            <TableCell align="right">Precios</TableCell>
                            <TableCell align="right">Descripción</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                            <TableCell align="right">Imagen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell component="th" scope="row">{row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.category}</TableCell>
                                        <TableCell align="right">{PropertiComponent(row.propertis)}</TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                        <TableCell align="right">
                                            < Fab onClick={() => onDetailProduct(row)} size="small" color="primary" aria-label="add">
                                                <EditIcon></EditIcon>
                                            </Fab>
                                            < Fab onClick={() => onDeleteProduct(row.id as string)} size="small" color="secondary" aria-label="add">
                                                <DeleteForeverIcon></DeleteForeverIcon>
                                            </Fab>
                                        </TableCell>

                                        <TableCell align="right"> <p>{row.img}</p><img src={'./chat_boot/' + row.img} alt="" /> </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <style jsx>
                    {`
                img{
                 width: 30%;
                 height: auto;
                }
            `}
                </style>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </Paper>
    );
}

export default ListProducts