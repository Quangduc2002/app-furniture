import { axiosGet } from "./api/request";

export const serviceGetListBranch = () => {
  return axiosGet('/products' );
};