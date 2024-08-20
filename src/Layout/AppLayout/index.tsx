import Loading from '@/components/Loading/Loading';
import getUserAccounts from '@/store/Login/Login';
import Aos from 'aos';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const AppLayout = () => {
  getUserAccounts();

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default AppLayout;
