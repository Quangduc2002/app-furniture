import { atom } from "jotai";

export interface User_Default {
  isAuthenticated: boolean,
  account: { roles: any, token:any, getUser:any }
};

export const userDefault = atom<User_Default | null>({
  isAuthenticated: false,
  account: { roles: null, token: null, getUser: null }
});