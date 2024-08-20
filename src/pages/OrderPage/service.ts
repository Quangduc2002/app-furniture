import { axiosGet, axiosPost, axiosPut } from "@/api/request";

export const serviceGetAllOrder= (id: number, slug:string) => {
  return axiosGet(`/order/${id}/${slug}`);
};

export const serviceGetRatings= (id: number) => {
  return axiosGet(`/products/${id}/getRating`);
};

export const serviceSeeEvaluate= (id: number) => {
  return axiosGet(`/orderItem/${id}/orderFinish`);
};

export const serviceSubmitEvaluate = (userId: number, checkStar:any) => {
  return axiosPut('/products/rating', {userId , checkStar});
}