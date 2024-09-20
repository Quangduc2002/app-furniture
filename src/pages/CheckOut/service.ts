import { axiosGet, axiosPost } from "@/api/request"

export interface OrderProps {
  Product: any | null,
  tenKH: string | null,
  soDT: string | null,
  diaChi: string | null,
  email: string | null,
  phuongThucTT: any | null,
  note?: string | null,
  trangThaiDH: any | null,
  maKH: any | null,
  isPay: boolean | null,
}

// export const serviceOrder = async ({Product, tenKH,soDT,diaChi,email,phuongThucTT,note,trangThaiDH,maKH,isPay} : OrderProps) => {
//   return await axiosPost('/order', {Product, tenKH,soDT,diaChi,email,phuongThucTT,note,trangThaiDH,maKH,isPay})
// }

export const serviceOrder = async (data : OrderProps) => {
  return await axiosPost('/order', data)
}
