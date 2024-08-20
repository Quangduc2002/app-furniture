import { axiosPost } from "@/api/request"

interface IAccount {
  user: any;
  options?: string;
  OTP?:any
  password?:any
}

export const serviceFindAccount = async (email:string) => {
  return await axiosPost('/user/findUser', {email:email})
}

export const serviceRecover = async ({user, options}:IAccount) => {
  return await axiosPost('/user/sendEmail', {
    user:user,
    options:options
  })
}

export const serviceCompareCode = async ({user, OTP}:IAccount) => {
  return await axiosPost('/user/confirmOTP', {
    user: user,
    OTP: OTP,
  })
}

export const serviceResetOTP = async ({user, OTP}:IAccount) => {
  return await axiosPost('/user/resetOTP', {
    user: user,
    OTP: OTP,
  })
}

export const serviceUpdatePassword = async ({user, password}:IAccount) => {
  return await axiosPost('/user/updatePass', {
    user: user,
    password: password,
  })
}