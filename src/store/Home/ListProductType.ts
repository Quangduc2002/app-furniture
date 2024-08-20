import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import {  atomProductTypes } from "./type";
import {  serviceGetProductTypes } from "@/pages/HomePage/service";
import { useEffect } from "react";

 const getProductTypes = (id:any) => {
  const [, setProductTypes] = useAtom(atomProductTypes);
  useRequest(() => serviceGetProductTypes(id), {
    onSuccess:  (res) => {
      setProductTypes(res.data);
    },
  });

}

export default getProductTypes