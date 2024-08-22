import { axiosGet, axiosPost, axiosPut } from "@/api/request"

export const serviceDeleteProduct = ({id, status}: any) => {
  return axiosPut(`/products/${id}/delete`, {trangThai:status})
}


export const serviceDeleteAllProduct = ({isChecked, status, action}: any) => {
  return axiosPut('/products/deleteAll', {
    isChecked:isChecked,
    trangThai:status,
    action:action
  })
}

export const serviceMeterial = () => {
  return axiosGet(`/products/meterial`)
}

export const serviceProductType = () => {
  return axiosGet(`/producttypes`)
}

export const serviceAddProduct = (data:any) => {
  return axiosPost(`/products/add`,data)
}

export const serviceEditProduct = (id:any, data:any) => {
  return axiosPut(`products/${id}/edit`, data)
}
