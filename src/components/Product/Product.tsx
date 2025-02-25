import React from 'react';
import clsx from 'clsx';
import styles from './Product.module.scss';
import { useNavigate } from 'react-router-dom';
import { FormatPrice } from '@/utils/FormatPrice';
import { ConvertSlugUrl } from '@/utils/ConvertSlugUrl';
import { ROUTE_PATH } from '@/routes/route.constant';

function Product({ product }: any) {
  const navigate = useNavigate();
  // đánh giá sản phẩm
  // khai báo 5 sao
  const starsTotal = 5;
  const starPercentage = (product.tongDanhGia / starsTotal) * 100;
  // Math.round làm tròn lên
  const starPercentageRounded = `${Math.round(starPercentage)}%`;
  const onNavigateToRoomDetail = () => {
    navigate(ROUTE_PATH.PRODUCT_DETAIL(ConvertSlugUrl(product.tenSp), product.ID));
  };
  return (
    <div className={clsx(styles.room_product1)}>
      <div className={clsx(styles.room_product1_link)}>
        <div className={clsx(styles.room_image)}>
          <div className={clsx(styles.room_badge, styles.hover)}>
            <img className='w-full h-full' alt='' src={`${product.image}`} />
            <div
              className={clsx(
                styles.productDetail,
                'absolute w-full flex justify-center bottom-[16%] ',
              )}
            >
              <button
                onClick={onNavigateToRoomDetail}
                className='lg:text-base px-3.5 py-2 cursor-pointer border-0 bg-white xs:text-xs no-underline rounded-[20px] hover:text-white hover:bg-black'
              >
                Chi tiết sản phẩm
              </button>
            </div>
            {product.giamGia === '0' ? (
              ''
            ) : (
              <span className={clsx(styles.room_pos, 'top-2')}>-{product.giamGia}%</span>
            )}
          </div>
        </div>
        <div className={clsx(styles.room_text)}>
          <p title={product.text}>{product.tenSp}</p>
          <div className={clsx(styles.room_price)}>
            {product.giamGia !== '0' ? (
              <span className={clsx(styles.priceAmount)}>
                {FormatPrice.format(product.giaBan)} đ
              </span>
            ) : (
              ''
            )}
            <span className={clsx(styles.priceRed, 'text-[16px]')}>
              {FormatPrice.format(product.giaBan - (product.giaBan * product.giamGia) / 100)} đ
            </span>
          </div>
          <div className='stars-outer'>
            <div style={{ width: starPercentageRounded }} className='stars-inner'></div>
          </div>
          <p className='text-[16px]'>Hà Nội</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
