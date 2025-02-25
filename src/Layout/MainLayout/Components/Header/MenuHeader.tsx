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
      {ROUTE_HEADER_PROFILE.concat(
        user?.account?.getUser?.roleId !== 1
          ? [
              {
                id: 'manageProduct',
                title: 'Quản lý sản phẩm',
                href: ROUTE_PATH.REVENUA,
                icon: () => <Icon icon='icon-gear' className='text-[20px]' />,
              },
            ]
          : [],
      )?.map((item: any) => {
        return (
          <NavLink key={item.id} className={clsx(styles.wrapper1_menu, 'items-center gap-3')} to={item?.href}>
            {item?.icon()}
            <p>{item?.title}</p>
          </NavLink>
        );
      })}

      <div className={clsx(styles.wrapper1_menu, 'items-center gap-3')}>
        <Icon className='text-' icon={'icon-right-to-bracket'} />
        <p onClick={handleLogOutUser}>Đăng xuất</p>
      </div>
    </div>
  );
};
