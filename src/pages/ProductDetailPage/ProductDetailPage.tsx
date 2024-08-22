import { motion, spring } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Image } from 'antd';
import { useRequest } from 'ahooks';
import Loading from '@/components/Loading/Loading';
import styles from './ProductDetails.module.scss';
import { serviceGetEvaluation, serviceGetProductDetail, serviceGetSimilarProduct } from './service';
import { FormatPrice } from '@/utils/FormatPrice';
import { Icon } from '@/components/UI/IconFont/Icon';
import moment from 'moment';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Product from '@/components/Product/Product';
import { onAdd } from '@/store/Cart/handleCart';
import { useAtom } from 'jotai';
import { userDefault } from '@/store/Login/type';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import { atomListCart } from '@/store/type';
type ProductDetailParams = {
  param: string;
  id: string;
};

function ProductDetailPage() {
  const { id } = useParams<ProductDetailParams>();
  const navigate = useNavigate();
  const [user] = useAtom(userDefault);
  const [showDescribetion, setShowDescribetion] = useState(true);
  const [cartItems, setCartItems] = useAtom(atomListCart);

  const [count, setCount] = useState<any>(1);
  const { data: product } = useRequest(() => serviceGetProductDetail(id), {
    refreshDeps: [id],
  });

  const { data: Evaluation } = useRequest(() => serviceGetEvaluation(id, null), {
    refreshDeps: [id],
  });

  const { data: SimilarProduct } = useRequest(
    () => serviceGetSimilarProduct(product?.data?.producttypeId),
    {
      refreshDeps: [product],
    },
  );

  // đánh giá sản phẩm
  // khai báo 5 sao
  const starsTotal = 5;
  const starPercentage = (product?.data?.tongDanhGia / starsTotal) * 100;
  // Math.round làm tròn lên
  const starPercentageRounded = `${Math.round(starPercentage)}%`;
  const handleIncreaseProduct = () => {
    if (count < product?.data?.soLuong) {
      setCount(count + 1);
    }
  };

  const handleProductreduction = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const stars = [
    { id: 1, class: 'star-1' },
    { id: 2, class: 'star-2' },
    { id: 3, class: 'star-3' },
    { id: 4, class: 'star-4' },
    { id: 5, class: 'star-5' },
  ];
  const options = {
    rewind: true,
    type: 'loop',
    autoplay: true,
    interval: 3000,
    perPage: 4,
    pagination: false,
    drag: 1,
    arrows: true,
    gap: 20,
    perMove: 1,
    breakpoints: {
      992: {
        perPage: 3,
        arrows: false,
      },
      768: {
        perPage: 2,
        arrows: false,
      },
      576: {
        perPage: 1,
        arrows: false,
      },
    },
  };
  const totalRatings = Evaluation?.data?.ratings.length;

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      setCartItems([]);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddCart = () => {
    if (user?.isAuthenticated) {
      onAdd({
        product: product?.data,
        cartItems,
        setCartItems,
        count,
        setCount,
        user: user,
      });
    } else {
      navigate(ROUTE_PATH.LOGIN);
    }
  };

  return (
    <div className='pb-[60px]'>
      <div className={clsx(styles.medium)}>
        <div className={clsx(styles.breadcrumbs, 'items-center')}>
          <Link to='/' className={clsx(styles.Link)}>
            Trang chủ
          </Link>
          <Icon icon='icon-alt-arrow-right' className='text-[18px]' />
          <span>Chi tiết sản phẩm</span>
          <Icon icon='icon-alt-arrow-right' className='text-[18px]' />
          <span>{product?.data?.tenSp}</span>
        </div>
      </div>
      {product?.data.length === 0 ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ y: '4rem', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            type: spring,
          }}
        >
          <div className={clsx(styles.productDetail)}>
            <div className={clsx(styles.images, 'relative')}>
              <Image className='!w-[550px] !h-[400px]' src={`${product?.data?.image}`} />
            </div>
            <div className={clsx(styles.right)}>
              <h1 className='text-3xl'>{product?.data?.tenSp}</h1>
              {product?.data?.soLuotDanhGia !== 0 ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <span style={{ borderBottom: '1px solid', color: '#f62d3e' }}>
                      {product?.data?.tongDanhGia.toFixed(1)}
                    </span>
                    &nbsp;
                    <div className={clsx(styles.right_star, 'stars-outer')}>
                      <div
                        style={{ width: starPercentageRounded }}
                        className={clsx(styles.right_starinner, 'stars-inner')}
                      ></div>
                    </div>
                  </div>
                  <div style={{ paddingLeft: 15 }}>
                    {product?.data?.soLuotDanhGia} &nbsp;
                    <span style={{ color: '#767676' }}>Đánh giá</span>
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className={clsx(styles.right_price)}>
                {product?.data?.giamGia !== '0' ? (
                  <>
                    <span className={clsx(styles.right_priceAmount)}>
                      {FormatPrice.format(product?.data?.giaBan)}
                    </span>
                    <span className={clsx(styles.right_priceRed)}>
                      {FormatPrice.format(
                        product?.data?.giaBan -
                          (product?.data?.giaBan * product?.data?.giamGia) / 100,
                      )}
                    </span>
                  </>
                ) : (
                  <span className={clsx(styles.right_priceRed)}>
                    {FormatPrice.format(product?.data?.giaBan)}
                  </span>
                )}
              </div>

              {product?.data?.giamGia !== '0' ? (
                <div className={clsx(styles.right_discountCode)}>
                  <p>Mã giảm giá của shop </p>
                  <span>-{product?.data?.giamGia}%</span>
                </div>
              ) : (
                ''
              )}

              <div className={clsx(styles.right_transport)}>
                <p>Vận chuyển</p>
                <div className={clsx(styles.right_transport__free)}>
                  <img
                    className={clsx(styles.right_transport__img)}
                    src={'/Images/free.png'}
                    alt=''
                  />
                  <span>Miễn phí vận chuyển</span>
                </div>
              </div>

              <div className={clsx(styles.right_transport)}>
                <p>Chất liệu</p>
                <div className={clsx(styles.right_transport__free)}>
                  <span>{product?.data?.Meterial.tenChatLieu}</span>
                </div>
              </div>

              <div className={clsx(styles.right_transport)}>
                <p>Kích thước</p>
                <div className={clsx(styles.right_transport__free)}>
                  <span>{product?.data?.kichThuoc} cm</span>
                </div>
              </div>

              <div style={{ marginTop: 30, marginBottom: 30 }}>
                <div className={clsx(styles.right_quantity)}>
                  <div>
                    <p>Số lượng</p>
                  </div>
                  <div className={clsx(styles.right_quantity__count)}>
                    <button onClick={handleProductreduction}>
                      <svg
                        enableBackground='new 0 0 10 10'
                        viewBox='0 0 10 10'
                        x='0'
                        y='0'
                        className='shopee-svg-icon'
                      >
                        <polygon points='4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5'></polygon>
                      </svg>
                    </button>
                    <span className='items-center'>{count}</span>
                    <button
                      onClick={handleIncreaseProduct}
                      className={`${
                        count === product?.data?.soLuong
                          ? '!cursor-not-allowed hover:!bg-white'
                          : ''
                      }`}
                    >
                      <svg
                        enableBackground='new 0 0 10 10'
                        viewBox='0 0 10 10'
                        x='0'
                        y='0'
                        className='shopee-svg-icon icon-plus-sign'
                      >
                        <polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5'></polygon>
                      </svg>
                    </button>
                  </div>
                  <div className={clsx(styles.right_quantity__available)}>
                    {product?.data?.soLuong} &nbsp;Sản phẩm có sẵn
                  </div>
                </div>
                {count === product?.data?.soLuong ? (
                  <div style={{ color: '#ee4d2d', marginTop: 10 }}>
                    Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className={clsx(styles.right_transport)}>
                <p>Trạng thái</p>
                <div className={clsx(styles.right_transport__free)}>
                  {product?.data?.soLuong !== 0 ? (
                    <span style={{ fontWeight: 700 }}>Còn hàng</span>
                  ) : (
                    <span style={{ color: ' #ee4d2d', fontWeight: 700 }}>Đã hết hàng</span>
                  )}
                </div>
              </div>

              <div className={clsx(styles.right_btn)}>
                <button onClick={() => handleAddCart()} className={clsx(styles.right_addcart)}>
                  <span>Thêm vào giỏ hàng</span>
                </button>

                <button
                  onClick={() => {
                    return handleAddCart(), navigate(ROUTE_PATH.CHECKOUT);
                  }}
                  className={clsx(styles.right_cart)}
                >
                  <span>Mua ngay</span>
                </button>
              </div>
            </div>
          </div>

          <div
            className={clsx(styles.describe, 'max-w-[1170px] py-[30px] border-y border-[#dcdcdc]')}
          >
            <ul className={clsx(styles.describe_ul)}>
              <li className={clsx(styles.describe_li)}>
                <p
                  onClick={() => setShowDescribetion(true)}
                  className={clsx(styles.describe_p, showDescribetion ? styles.active : '')}
                >
                  Mô tả
                </p>
              </li>
              <li className={clsx(styles.describe_li)}>
                <p
                  onClick={() => setShowDescribetion(false)}
                  className={clsx(styles.describe_p, !showDescribetion ? styles.active : '')}
                >
                  Đánh giá({product?.data?.soLuotDanhGia !== 0 ? product?.data?.soLuotDanhGia : 0})
                </p>
              </li>
            </ul>

            {showDescribetion && (
              <motion.div
                className={clsx(styles.describe_describe)}
                initial={{ y: '4rem', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  type: spring,
                }}
              >
                Đang cập nhật...
              </motion.div>
            )}
            {!showDescribetion && (
              <motion.div
                className={clsx(styles.describe_Evaluate)}
                initial={{ y: '4rem', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  type: spring,
                }}
              >
                <h2>Đánh giá sản phẩm “{product?.data?.tenSp}” </h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <span style={{ borderBottom: '1px solid', color: '#f8ce0b' }}>
                      {product?.data?.tongDanhGia.toFixed(1)}
                    </span>
                    &nbsp;
                    <div className={clsx('stars-outer')}>
                      <div
                        style={{ width: starPercentageRounded }}
                        className={clsx('stars-inner')}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className='border-b pb-4'>
                  <p>Sản phẩm đã được đánh giá</p>
                  <div className={clsx(styles.describe_evaluation, 'flex items-center gap-10')}>
                    <div className='ml-14'>
                      <p className='text-xl uppercase font-normal'>Sao trung bình</p>
                      <div
                        className={clsx(
                          styles.describe_evaluation__star,
                          'justify-center mt-2 text-xl',
                        )}
                      >
                        <span className='text-[#f8ce0b]'>
                          {product?.data?.tongDanhGia.toFixed(1)}
                        </span>
                        &nbsp;
                        <div className={clsx('star star-1 active')}></div>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      {stars.map((star, index) => {
                        return (
                          <div
                            key={star.id}
                            className={clsx(styles.describe_evaluation__star, 'items-center gap-2')}
                          >
                            <div className='flex'>
                              <span>{star.id}</span>
                              &nbsp;
                              <div key={star.id} className={clsx('star star-1 active')}></div>
                            </div>
                            <div className='w-52 h-2 bg-[#ccc] rounded-lg'>
                              <div
                                style={{
                                  width: `${
                                    totalRatings > 0
                                      ? (
                                          (Evaluation?.data?.ratings.filter(
                                            (item: any) => item?.numberRating === star?.id,
                                          ).length /
                                            totalRatings) *
                                          100
                                        ).toFixed(0)
                                      : 0
                                  }%`,
                                }}
                                className={`bg-[#f8ce0b] h-2 rounded-lg`}
                              ></div>
                            </div>
                            <div>
                              {totalRatings > 0
                                ? (
                                    (Evaluation?.data?.ratings.filter(
                                      (item: any) => item?.numberRating === star?.id,
                                    ).length /
                                      totalRatings) *
                                    100
                                  ).toFixed(0)
                                : 0}
                              %
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className='mt-6'>
                  {Evaluation?.data?.ratings.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={`flex gap-4  ${index === 0 ? 'pb-4' : 'py-4'} border-b`}
                    >
                      <div>
                        <img className='w-10 h-10 rounded-full' src={`${item.User.image}`} alt='' />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-4'>
                          <p className='!mt-0'>{item.User.name}</p>
                          <p className='!mt-0 text-[#00000066]'>
                            {moment(item?.createdAt).format('DD/MM/YYYY HH:mm')}
                          </p>
                        </div>
                        <div className={clsx(`star-${item.numberRating} active`)}></div>

                        <p className='!mt-0'>{item.comment ? item.comment : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {SimilarProduct?.data.length !== 0 && (
            <div className={clsx(styles.inner)}>
              <div className={clsx(styles.inner_container)}>
                <h3 className={clsx(styles.inner_title)}>SẢN PHẨM TƯƠNG TỰ</h3>
                <div className={clsx(styles.inner_slider)}>
                  <Splide
                    aria-label='Book related'
                    hasTrack={false}
                    options={options as any}
                    className={clsx(styles.splide)}
                  >
                    <div
                      className={clsx(
                        styles.btnButton,
                        'splide__arrows hidden transition duration-300 ease-in-out',
                      )}
                    >
                      <button className='!w-10 !h-10 !p-0 !border-2 !border-solid !border-white hover:!bg-[--main-color] hover:!border-[--main-color] !bg-transparent splide__arrow splide__arrow--next max-xl:!right-0'>
                        <Icon icon='icon-alt-arrow-right' className='text-[24px] text-white' />
                      </button>
                      <button className='!w-10 !h-10 !p-0 !border-2 !border-solid !border-white hover:!bg-[--main-color] hover:!border-[--main-color] !bg-transparent splide__arrow splide__arrow--prev max-xl:!left-0'>
                        <Icon icon='icon-alt-arrow-left' className='text-[24px] text-white' />
                      </button>
                    </div>
                    <SplideTrack>
                      {SimilarProduct?.data.map((product: any, index: number) => (
                        <SplideSlide key={index}>
                          <Product key={product.ID} product={product} />
                        </SplideSlide>
                      ))}
                    </SplideTrack>
                  </Splide>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default ProductDetailPage;
