import { OrderProps } from "@/pages/CheckOut/service";
import { atom } from "jotai";

export const atomListCart = atom<any>([]);
export const atomListCartUser = atom<any>([]);
export const atomOrderInfo = atom<OrderProps | null>({
    Product: null,
    tenKH: null,
    soDT: null,
    diaChi: null,
    email: null,
    phuongThucTT: null,
    note: null,
    trangThaiDH: null,
    maKH: null,
    isPay: null,
});