import { axiosGet, axiosPost } from "@/api/request"

interface OrderProps {
  Product: any,
  tenKH: string,
  soDT: string,
  diaChi: string,
  email: string,
  phuongThucTT: any,
  note?: string,
  trangThaiDH: any,
  maKH: any,
  isPay: boolean,
}

export const serviceOrder = async ({Product, tenKH,soDT,diaChi,email,phuongThucTT,note,trangThaiDH,maKH,isPay} : OrderProps) => {
  return await axiosPost('/order', {Product, tenKH,soDT,diaChi,email,phuongThucTT,note,trangThaiDH,maKH,isPay})
}
