import { axiosGet } from "@/api/request";

export const serviceGetAllProducts = (params?: any) => {
  return axiosGet('/products',{params});
};

export const serviceGetProductTypes = (id: any) => {
  return axiosGet(`/products/${id}/ProductType`);
};

export const serviceGetAllMeterial= () => {
  return axiosGet('/products/meterial');
};

