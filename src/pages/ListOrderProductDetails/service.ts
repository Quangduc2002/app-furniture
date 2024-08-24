import { axiosGet } from "@/api/request"

export const serviceOrder = () => {
  return axiosGet('/orderItem')
}