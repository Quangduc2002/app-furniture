import { useState } from 'react';
import clsx from 'clsx';
import HomeSearch from './HomeSearch';
import Product from '@/components/Product/Product';
import { List, Result } from 'antd';
import { useAtom } from 'jotai';
import { atomProducts } from '@/store/Home/type';
import { FilterProduct } from '@/utils/FilterProduct';

function HomeProducts({ products }: any) {
  const [pageSize, setPageSize] = useState(12);
  const [isActivePrice, setIsActivePrice] = useState(1);
  const [isCheckedMaterial, setIsCheckedMaterial] = useState<any>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [discount, setDiscount] = useState(false);
  const [ratings, setRatings] = useState('');
  const [searchs, setSearchs] = useState('');
  const [product] = useAtom(atomProducts);
  const filteredData = FilterProduct({
    product,
    minPrice,
    maxPrice,
    discount,
    ratings,
    isCheckedMaterial,
  });

  return (
    <div>
      <HomeSearch
        product={products?.data}
        setPageSize={setPageSize}
        isCheckedMaterial={isCheckedMaterial}
        setIsCheckedMaterial={setIsCheckedMaterial}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setDiscount={setDiscount}
        discount={discount}
        ratings={ratings}
        setRatings={setRatings}
        searchs={searchs}
        setSearchs={setSearchs}
        isActivePrice={isActivePrice}
        setIsActivePrice={setIsActivePrice}
      />
      <div className={clsx('m-auto max-w-[1170px] px-8')} data-aos='fade-up'>
        <List
          grid={{
            gutter: 20,
            column: 4,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
          }}
          pagination={
            filteredData?.length > pageSize
              ? {
                  total: filteredData?.length || 0,
                  pageSize: pageSize,
                  align: 'center',
                }
              : false
          }
          dataSource={filteredData}
          renderItem={(product: any) => (
            <List.Item>
              <Product key={product.ID} product={product} />
            </List.Item>
          )}
          locale={{
            emptyText: (
              <Result
                icon={
                  <img
                    src={'/svg/NoFile.svg'}
                    alt='Empty Data'
                    className='w-[148px] h-[160px] m-auto'
                  />
                }
                title='Chưa có thông tin'
              />
            ),
          }}
        />
      </div>
    </div>
  );
}

export default HomeProducts;
