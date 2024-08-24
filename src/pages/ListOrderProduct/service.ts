import { axiosGet, axiosPost } from "@/api/request"

export const serviceListOrder = () => {
  return axiosGet('/order/listOrder')
}

export const serviceOrderDetail = (id:any) => {
  return axiosGet(`/orderItem/${id}`)
}

export const serviceStatusOrder = (orderProduct:any, trangThaiDH:number) => {
  return axiosPost('/order/Email',{orderProduct:orderProduct, trangThaiDH:trangThaiDH})
}

export const serviceOrderAnnouce = () => {
  return axiosGet(`/order/annouce`)
}
