import { axiosGet } from "@/api/request"

export const serviceListOrder = () => {
  return axiosGet('/order/listOrder')
}

export const serviceOrderDetail = (id:any) => {
  return axiosGet(`/orderItem/${id}`)
}