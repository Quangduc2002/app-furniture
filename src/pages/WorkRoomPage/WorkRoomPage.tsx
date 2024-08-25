import Product from '@/components/Product/Product';
import { atomProductTypes } from '@/store/Home/type';
import { List, Result } from 'antd';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../LivingRoomPage/LivingRoom.module.scss';
import { Icon } from '@/components/UI/IconFont/Icon';
import Filter from '@/components/Filter/Filter';
import getProductTypes from '@/store/Home/ListProductType';

function WorkRoomPage() {
  getProductTypes(3);
  const [isActivePrice, setIsActivePrice] = useState(1);
  const [isCheckedMaterial, setIsCheckedMaterial] = useState<any>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [discount, setDiscount] = useState(false);
  const [ratings, setRatings] = useState('');
  const [product] = useAtom(atomProductTypes);
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
  return (
    <div className='pb-[60px]'>
      <>
        <div className='max-w-[1170px] px-8 m-auto h-[60px]'>
          <div className='flex justify-between h-full items-center'>
            <div className={clsx(styles.breadcrumbs, 'flex items-center gap-2')}>
              <Link to='/' className={clsx(styles.Link)}>
                Trang chủ
              </Link>
              <span className='text-[#666666b3]'>/</span>
              <span>Phòng làm việc</span>
            </div>

            <div
              className={clsx(
                styles.filter,
                showFilters ? styles.showFilter : '',
                'flex gap-2 items-center',
              )}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Icon icon='icon-filter' className='text-xl' />
              <span>Lọc</span>
            </div>
          </div>
        </div>
        {showFilters && (
          <Filter
            isCheckedMaterial={isCheckedMaterial}
            setIsCheckedMaterial={setIsCheckedMaterial}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setDiscount={setDiscount}
            discount={discount}
            ratings={ratings}
            setRatings={setRatings}
            isActivePrice={isActivePrice}
            setIsActivePrice={setIsActivePrice}
          />
        )}
      </>
      <div className='mt-[40px]'>
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
            pagination={{
              total: filteredData?.length || 0,
              pageSize: 12,
              align: 'center',
            }}
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
    </div>
  );
}

export default WorkRoomPage;
