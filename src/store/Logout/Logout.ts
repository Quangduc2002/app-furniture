import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';
import { userDefault } from '../Login/type';
import { serviceLogout } from '@/pages/Login/service';
import { toast } from '@/components/UI/Toast/toast';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';

const useLogout = () => {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userDefault);

  const { run: logoutUser } = useRequest(serviceLogout, {
    manual: true,
    onSuccess: (res) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser({
        isAuthenticated: false,
        account: { roles: null, token: null, getUser: null },
      });
      toast.success('Đăng xuất thành công !');
      navigate(ROUTE_PATH.HOME);
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  return { logoutUser };
};

export default useLogout;
