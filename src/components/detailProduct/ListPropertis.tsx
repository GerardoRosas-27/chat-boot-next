import { propertisDTO } from '@interfaces/products';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { PropsEvents, PropsPropertis } from '@interfaces/Props';
import { useEffect, useState } from 'react';

const customWidth = {
    width: '100%',
    height: 'auto'
}

export const ListPropertis = (props: PropsPropertis<propertisDTO[], propertisDTO[]>) => {
    const { data, addPropertis } = props
    console.log("data propertis: ", data)
    const [propertis, setpropertis] = useState(data)
    const [increment, setIncrement] = useState(0)
    const [edit, setEdit] = useState(false)
    console.log("propertis: ", propertis)

    useEffect(() => {
        setpropertis(data);
        if (data && data.length > 0) {
            setEdit(true);
        }
    }, [data])



    const onAdd = () => {
        setIncrement(increment + 1);
        setpropertis(propertis => [...propertis, { id: increment.toString(), size: '', price: 0 }])
        console.log("add propertis: ", propertis)
    }
    const onSend = () => {
        addPropertis(propertis);
        setEdit(true)
    }

    const onClear = (item: propertisDTO) => {
        let id: string = item.id as string;
        let data = propertis.filter(item => item.id !== id);
        setpropertis(data);
        addPropertis(data);
    }
    const onChangeSize = (e: any, item: propertisDTO) => {
        let id: string = item.id as string;
        let value = e.target.value;
        setpropertis(
            propertis.map(item =>
                item.id === id
                    ? { ...item, size: value }
                    : item
            ))
    }
    const onChangePrice = (e: any, item: propertisDTO) => {
        let id: string = item.id as string;
        let value = e.target.value;
        setpropertis(
            propertis.map(item =>
                item.id === id
                    ? { ...item, price: value }
                    : item
            ))
    }

    return (
        <>
            <Grid container direction="row">
                <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Fab onClick={() => onAdd()} size="small" color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction="row" justifyContent="flex-end">
                        {propertis.length > 0 ?
                            < Fab onClick={() => edit ? setEdit(false) : onSend()} size="small" color="primary" aria-label="add">
                                {edit ? <EditIcon></EditIcon> : <DoneIcon></DoneIcon>}
                            </Fab> : null
                        }
                    </Grid>
                </Grid>
            </Grid>
            {
                propertis.map(item => {
                    return (

                        <Grid container direction="row" key={item.id}>
                            <Grid item p={2} xs={5}>
                                <TextField disabled={edit} value={item.size} onChange={(e) => onChangeSize(e, item)} style={customWidth} id="standard-basic" label="Tamaño" variant="standard" />
                            </Grid>
                            <Grid item p={2} xs={5}>
                                <TextField disabled={edit} value={item.price} onChange={(e) => onChangePrice(e, item)} style={customWidth} id="standard-basic" label="Precio" variant="standard" />
                            </Grid>
                            <Grid item p={2} xs={2}>

                                {!edit ? <Fab onClick={() => onClear(item)} size="small" color="secondary" aria-label="add">
                                    <ClearIcon></ClearIcon>
                                </Fab> : null}

                            </Grid>
                        </Grid>
                    )
                })
            }
        </>
    )
}