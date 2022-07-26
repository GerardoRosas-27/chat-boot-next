import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export const SkeletonList = () => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <Item>
                        <Skeleton
                            animation="wave"
                            height={20}
                            width="100%"
                        />
                    </Item>
                </Grid>
                <Grid item md={3}>
                    <Item>
                        <Skeleton
                            animation="wave"
                            height={20}
                            width="100%"
                        />
                    </Item>
                </Grid>
                <Grid item md={2}>
                    <Item>
                        <Skeleton
                            animation="wave"
                            height={20}
                            width="100%"
                        />
                    </Item>
                </Grid>
                <Grid item md={2}>
                    <Item><Skeleton
                        animation="wave"
                        height={20}
                        width="100%"
                    /></Item>
                </Grid>
                <Grid item md={2}>
                    <Item>
                        <Skeleton
                            animation="wave"
                            height={20}
                            width="100%"
                        />
                    </Item>
                </Grid>
            </Grid>
        </Paper>

    )
}
