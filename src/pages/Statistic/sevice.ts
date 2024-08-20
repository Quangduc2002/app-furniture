import { axiosGet, axiosPost, axiosPut } from "@/api/request"

export const serviceBill =  () => {
  return axiosGet(`/order/bill`,)
}

export const serviceCustomer=  () => {
  return axiosGet(`user/Customer`,)
} 

export const serviceStatusWait=  () => {
  return axiosGet(`/products/statistic/status`,)
}

export const serviceIncome=  () => {
  return axiosGet(`/order/income`,)
}

export const serviceChartStatistic =  (year:any) => {
  return axiosPost('/products/chartStatistic', {
      year: year,
  });
};

export const serviceStatistic = (data:any) => {
  return axiosPost('/products/statistic', data);
};