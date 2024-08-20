import { axiosGet, axiosPut } from "@/api/request"

export const serviceGetTrash = () => {
  return axiosGet('/products/getTrash')
}

export const serviceTrash = ({isChecked, status, action}: any) => {
  return axiosPut('/products/trash',{
    isChecked:isChecked,
    trangThai:status,
    action:action
  })
}