import React from 'react';
import clsx from 'clsx';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styles from './Home.module.scss';
import { Icon } from '@/components/UI/IconFont/Icon';

function HeroBanner() {
  const options = {
    rewind: true,
    type: 'loop',
    autoplay: true,
    interval: 3000,
    perPage: 1,
    pagination: true,
    drag: 1,
    arrows: true,
  };
  const slickSlides = ['Images/slider_1.jpg', 'Images/slider_2.jpg', 'Images/slider_3.jpg'];
  return (
    <div className={clsx(styles.home1, 'home1')}>
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
          {slickSlides?.map((item: any, index: number) => (
            <SplideSlide key={index}>
              <img className={clsx(styles.home1_img)} alt='' src={item} loading='lazy' />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  );
}

export default HeroBanner;
