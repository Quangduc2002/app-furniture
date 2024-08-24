import { axiosDelete, axiosGet, axiosPost, axiosPut } from "@/api/request"

export const serviceMaterial = () => {
  return axiosGet('/material')
}

export const serviceAddMaterial = (data:any) => {
  return axiosPost('/material/add', data)
}

export const serviceDeleteMaterial = (id:number) => {
  return axiosDelete(`/material/${id}/delete`)
}

export const serviceUpdateMaterial = (id:number, data:any) => {
  return axiosPut(`/material/${id}/update`, data)
}