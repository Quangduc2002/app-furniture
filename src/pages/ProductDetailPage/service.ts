import { axiosGet, axiosPost } from "@/api/request";

export const serviceGetProductDetail = (id: any) => {
  return axiosGet(`/products/${id}`);
};

export const serviceGetEvaluation = (id: any, currentPage:any) => {
  return axiosPost(`/products/${id}/evaluaAll`,{
    currentPage: currentPage,
  });
};

export const serviceGetSimilarProduct = (smlproduct:any) => {
  return axiosGet(`/products/${smlproduct}/ProductType`);
};