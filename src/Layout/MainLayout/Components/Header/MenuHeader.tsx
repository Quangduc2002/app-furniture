import { userDefault } from '@/store/Login/type';
import { useAtom } from 'jotai';
import clsx from 'clsx';
import styles from '@/Layout/MainLayout/index.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@/components/UI/IconFont/Icon';
import useLogout from '@/store/Logout/Logout';
import { ROUTE_PATH } from '@/routes/route.constant';
import { ROUTE_HEADER_PROFILE } from './Header.Constant';

interface MenuHeaderProps {
  user: any;
  hide: any;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ user, hide }) => {
  const { logoutUser } = useLogout();
  const handleLogOutUser = () => {
    logoutUser();
    hide();
  };
  return (
    <div>
      {user?.account && user?.account && user?.account?.getUser?.roleId !== 1 ? (
        <Link to={ROUTE_PATH.REVENUA} className={clsx(styles.wrapper1_menu, 'items-center gap-3')}>
          <Icon icon='icon-gear' />
          <p>Quản lý sản phẩm</p>
        </Link>
      ) : (
        ''
      )}
      {ROUTE_HEADER_PROFILE?.map((item: any) => {
        return (
          <NavLink
            className={clsx(styles.wrapper1_menu, 'items-center gap-3')}
            // to={`${path.LayoutProfile}`}
            to={item?.href}
          >
            {item?.icon()}
            <p>{item?.title}</p>
          </NavLink>
        );
      })}

      {/* {user?.account && user?.account && user?.account?.getUser?.roleId === 1 ? (
        <NavLink
          className={clsx(styles.wrapper1_menu, 'items-center gap-3')}
          to={ROUTE_PATH.LISTORDER}
        >
          <Icon className='w-5 h-5' icon={'icon-clip-board'} />
          <p>Đơn mua</p>
        </NavLink>
      ) : (
        ''
      )} */}

      <div className={clsx(styles.wrapper1_menu, 'items-center gap-3')}>
        <Icon className='w-5 h-5' icon={'icon-right-to-bracket'} />
        <p onClick={handleLogOutUser}>Đăng xuất</p>
      </div>
    </div>
  );
};
