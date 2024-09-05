import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Home.module.scss';
import HeroBanner from './HeroBanner';
import HomeProducts from './HomeProducts';
import HomeSellProduct from './HomeSellProduct';
import HomeMap from './HomeMap';
import { useAtom } from 'jotai';
import { atomProducts } from '@/store/Home/type';
import getListProducts from '@/store/Home/ListProducts';

function HomePage() {
  const [product] = useAtom(atomProducts);
  const { handleSearch, products } = getListProducts({ searchValue: '' });
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className={clsx(styles.home)}>
      <HeroBanner />
      <HomeProducts products={product} />
      <HomeSellProduct products={products && products?.data} />
      <HomeMap />
    </div>
  );
}

export default HomePage;
