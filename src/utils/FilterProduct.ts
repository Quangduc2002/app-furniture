interface IFilterProduct {
  product: any;
  maxPrice:any,
  minPrice:any
  discount:boolean
  ratings:any,
  isCheckedMaterial:any
}
 
export const FilterProduct = ({
  product,
  maxPrice,
  minPrice,
  discount,
  ratings,
  isCheckedMaterial
}:IFilterProduct) => {
  const filteredData = product?.filter(
    (product: any) =>
      (isCheckedMaterial.length === 0 || isCheckedMaterial.includes(product.chatLieu)) &&
      (maxPrice
        ? (minPrice === '' ||
            product.giaBan - (product.giaBan * product.giamGia) / 100 >= parseInt(minPrice)) &&
          (maxPrice === '' ||
            product.giaBan - (product.giaBan * product.giamGia) / 100 <= parseInt(maxPrice))
        : minPrice === '' ||
          product.giaBan - (product.giaBan * product.giamGia) / 100 >= parseInt(minPrice)) &&
      (discount ? product.giamGia > 0 : product.giamGia >= 0) &&
      (ratings === '' || (ratings ? product.tongDanhGia >= ratings : '')),
  );

  return filteredData
};


