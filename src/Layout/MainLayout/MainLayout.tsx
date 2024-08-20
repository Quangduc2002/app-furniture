import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import styles from './index.module.scss';

import Footer from './Components/Footer/Footer';
import HeaderRow1 from './Components/Header/HeaderRow1';
import HeaderRow2 from './Components/Header/HeaderRow2';
import HeaderRow3 from './Components/Header/HeaderRow3';
import { useAtom } from 'jotai';
import { userDefault } from '@/store/Login/type';
import { atomListCart, atomListCartUser } from '@/store/type';

function MainLayout() {
  const [user] = useAtom(userDefault);
  const [, setListCartUser] = useAtom(atomListCartUser);
  const [cartItems, setCartItems] = useAtom(atomListCart);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    setListCartUser(
      cartItems &&
        cartItems?.filter((item: any) => item.customer_id === user?.account?.getUser?.id),
    );
  }, [cartItems]);

  return (
    <Suspense fallback={undefined}>
      <div className={clsx(styles.wrapper)}>
        <HeaderRow1 />
        <HeaderRow2 />
        <HeaderRow3 />
      </div>

      <main className='max-w-[1440px] m-auto'>
        <Outlet />
      </main>

      <Footer />
    </Suspense>
  );
}

export default MainLayout;
