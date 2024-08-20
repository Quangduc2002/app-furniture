import React from 'react';
import clsx from 'clsx';
import styles from './Home.module.scss';
import { Icon } from '@/components/UI/IconFont/Icon';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Product from '@/components/Product/Product';

function HomeSellProduct({ products }: any) {
  const sections = [
    {
      image: 'Images/srv_1.png',
      text: 'Sản phẩm chính hãng',
      text1: 'Chúng tôi cam kết 100% sản phẩm là hàng chính hãng, chất lượng cao',
    },

    {
      image: 'Images/srv_2.png',
      text: 'Bảo hành chuyên nghiệp',
      text1: 'Dịch vụ bảo hành tận nơi chuyên nghiệp, tận tình và chu đáo cho khách hàng',
    },

    {
      image: 'Images/srv_3.png',
      text: 'Giá tốt nhất tại Việt Nam',
      text1: 'Tự tin là nhà cung cấp sản phẩm nội thất với giá cả tốt nhất tại Việt Nam',
    },
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

  const optionSections = {
    rewind: true,
    type: 'slide',
    autoplay: true,
    interval: 3000,
    perPage: 3,
    pagination: false,
    drag: 1,
    arrows: false,
    gap: 20,
    perMove: 1,
    breakpoints: {
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

  return (
    <div>
      <div className={clsx(styles.box)} data-aos='fade-left'>
        <div className={clsx(styles.box_dark)}>
          <div className={clsx(styles.box_info)}>
            <h2>Hệ thống phân phối & bán lẻ nội thất số 1 tại Việt Nam</h2>
            <p>Hotline: 0965420922 -Email: phamquangduc110@gmail.com</p>
          </div>
        </div>
      </div>

      {products?.length > 0 && (
        <div className={clsx(styles.inner)} data-aos='fade-up'>
          <div className={clsx(styles.inner_container)}>
            <h3 className={clsx(styles.inner_title, 'text-xl')}>SẢN PHẨM BÁN CHẠY</h3>
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
                  {products?.map((product: any, index: number) => (
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

      <div
        className={clsx(styles.home_section, 'max-w-[1170px] m-auto my-20 px-8')}
        data-aos='fade-right'
      >
        <Splide
          aria-label='Book related'
          hasTrack={false}
          options={optionSections as any}
          className={clsx(styles.splide)}
        >
          <SplideTrack>
            {sections.map((section, index) => (
              <SplideSlide key={index}>
                <div key={index} className={clsx(styles.home_inner)}>
                  <img className='w-[80px] h-[80px]' alt='' src={section.image} />
                  <div className={clsx(styles.home_inner__box)}>
                    <h4 className='text-xl' style={{ color: '#f62d3e' }}>
                      {section.text}
                    </h4>
                    <p>{section.text1}</p>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
    </div>
  );
}

export default HomeSellProduct;
