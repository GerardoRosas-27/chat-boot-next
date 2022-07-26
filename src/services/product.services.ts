import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '@models/ApiResponse';
import { productsDTO } from '@interfaces/products';
import { routesApi } from 'src/environment/routesApi';
import { responseGeneral } from '@interfaces/response';

export const postProductService = async (data: productsDTO): Promise<responseGeneral<productsDTO[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    validateStatus: (status) => true,
  };
  const response = await axios.post(routesApi.product, data, config);

  return response.data;
};
export const putProductService = async (id: string, data: productsDTO): Promise<responseGeneral<productsDTO[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    validateStatus: (status) => true,
  };
  const response = await axios.put(routesApi.product + '/' + id, data, config);

  return response.data;
};

export const uploadFileRequest = async (
  formData: FormData,
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: progressCallback,
    validateStatus: (status) => true,
  };
  const response = await axios.post(routesApi.uploadImg, formData, config);

  return response.data;
};
