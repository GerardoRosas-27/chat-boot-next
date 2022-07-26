import React, { FormEvent, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { UiFileInputButton } from './UiFileInputButton';
import { uploadFileRequest } from '@services/product.services';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { EventReturn, PropsEvents } from '@interfaces/Props';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const customWidth = {
  width: '100%',
  height: 'auto'
}

export const UploadImg = (props: PropsEvents<string, string>) => {
  const { data, event } = props;
  const [progress, setProgress] = React.useState(0);
  const [imgDonwload, setImgDonwload] = React.useState<string>();

  const onChange = async (formData: FormData) => {
    setProgress(0);
    setImgDonwload('');
    const response = await uploadFileRequest(formData, (event) => {
      let result = Math.round((event.loaded * 100) / event.total);
      setProgress(result)
    });
    if (response.error) {
    } else {
      setImgDonwload(response.data ? response.data[0] : '')
      event(response.data ? response.data[0] : '')
    }
  };

  return (
    <div>
      <Grid container direction="row" justifyContent="center" p={2}>
        <UiFileInputButton label="Subir imagen" uploadFileName="theFiles" onChange={onChange} />
      </Grid>

      <Box sx={{ flexGrow: 1 }}>
        <BorderLinearProgress variant="determinate" value={progress} />
        <img style={customWidth} src={'../../chat_boot/' + (progress == 0 ? data : imgDonwload)} alt="" />

      </Box>
    </div>
  );
};
