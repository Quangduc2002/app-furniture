import { axiosGet, axiosPost } from "@/api/request"

interface LoginProps {
  email: string;
  password: string
}

export const serviceLogin = async ({email, password} : LoginProps) => {
  return await axiosPost('/user/login',{
    email: email,
    password: password,
  })
}

export const serviceGetAccount = async () => {
  return await axiosGet('/user/account')
}

export const serviceLogout = async () => {
  return await axiosGet('/user/logout')
}

export const serviceRegister = async (data:any) => {
  return await axiosPost('/user/register', {data})
}

