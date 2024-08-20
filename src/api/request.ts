import baseURL from './constant';

function axiosGet(url:string,action?:any) {
  return baseURL.get(url,action);
}

function axiosDelete(url:string) {
  return baseURL.delete(url);
}

function axiosPut(url:string, action:any) {
  return baseURL.put(url, action);
}

function axiosPost(url:string, action:any) {
  return baseURL.post(url, action);
}

export { axiosGet, axiosDelete, axiosPut, axiosPost };
