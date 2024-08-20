import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import { atomProducts } from "./type";
import { serviceGetAllProducts } from "@/pages/HomePage/service";

interface GetListProductsProps {
  valueSearch?: string
}

 const getListProducts = ({valueSearch}: GetListProductsProps) => {
  const [, setListProducts] = useAtom(atomProducts);
  const { data: products, run:searchProduct, refresh:onRefresh } = useRequest(serviceGetAllProducts, {
    manual: true,
    onSuccess:  (res) => {
      setListProducts(res.data);
    },
  });

  const handleSearch = (searchValue: string) => {
    searchProduct({ tenSp: searchValue });
  };

  return { handleSearch ,products,onRefresh};
}

export default getListProducts