import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import { atomProducts } from "./type";
import { serviceGetAllProducts } from "@/pages/HomePage/service";

interface GetListProductsProps {
  searchValue: string
}

 const getListProducts = ({searchValue}: GetListProductsProps) => {
  const [, setListProducts] = useAtom(atomProducts);
  const { data: products, run:searchProduct, refresh:onRefresh } = useRequest(serviceGetAllProducts, {
    manual: true,
    onSuccess:  (res) => {
      setListProducts(res.data);
    },
  });

  const handleSearch = () => {
    searchProduct({ tenSp: searchValue });
  };

  return { handleSearch ,products,onRefresh};
}

export default getListProducts