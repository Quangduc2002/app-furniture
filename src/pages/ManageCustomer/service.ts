import { axiosDelete, axiosGet, axiosPost, axiosPut } from "@/api/request"

export const serviceGetCustomer = () => {
  return axiosGet('/user/Customer')
}

export const serviceStatisCustomer = (data:any) => {
  return axiosPost('/user/statistic', data)
}

export const serviceDeleteClient = (id:any, status: number) => {
  return axiosPut(`/user/${id}/client`, {status})
}