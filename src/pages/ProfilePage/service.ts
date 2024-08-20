import { axiosGet, axiosPut } from "@/api/request"

export const serviceGetUser = (id: number) => {
  return axiosGet(`/user/${id}`)
}

export const serviceEditUser =  (id: number, data:any, ) => {
  return axiosPut(`/user/${id}/edit`, {data})
}

export const serviceChangePassword =  (id: number, data:any, ) => {
  return axiosPut(`/user/${id}/changePassword`, {data})
}