export const ROUTE_PATH = {
  HOME: '/',
  LIVINGROOM: '/phong-khach',
  KETCHEN: '/phong-bep',
  WORKROOM: '/phong-lam-viec',
  BEDROOM: '/phong-ngu',
  CART: '/gio-hang',  
  CHECKOUT: '/check-out',
  LISTORDER: '/list-order',
  PROFILE: '/profile',
  PRODUCT_DETAIL: (param:string ,id: string ) => `/san-pham/${param}/${id}`,

  LOGIN: '/login',
  FINDACCOUNT: '/login/find-account',
  RECOVER: '/login/recover',
  ENTERCODE: '/login/enter-code',
  PASSWORDNEW: '/login/password-new',

  REVENUA: '/admin/thong-ke',
  MANAGEPRODUCT: '/admin/san-pham',
  TRASHPRODUCT: '/admin/thung-rac',
  ADDPRODUCT:(action:string) => `/admin/san-pham/${action}`,
  EDITPRODUCT: (id:string, action:string) => `/admin/san-pham/${id}/${action}` ,
};
