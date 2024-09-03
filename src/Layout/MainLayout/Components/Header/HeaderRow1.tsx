import React, { useState } from 'react';
import clsx from 'clsx';
import styles from '../../index.module.scss';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import { useAtom } from 'jotai';
import { userDefault } from '@/store/Login/type';
import { Icon } from '@/components/UI/IconFont/Icon';
import { Popover } from 'antd';
import { MenuHeader } from './MenuHeader';

function HeaderRow1() {
  const [user] = useAtom(userDefault);
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className={clsx(styles.top)}>
      <div
        className={clsx(
          styles.wrapper1,
          'h-10 flex lg:justify-between items-center max-w-[1440px] xs:w-auto m-auto xs: justify-center lg:m-auto px-8',
        )}
      >
        <div>
          <h3 className='font-bold'>CHÀO MỪNG BẠN ĐẾN VỚI HỆ THỐNG SIÊU THỊ NỘI THẤT </h3>
        </div>
        <div className={clsx(styles.wrapper1_medium)}>
          <ul>
            <li
              className={clsx(styles.wrapper1_medium__li)}
              style={{ marginRight: 12, marginLeft: 12 }}
            >
              <span>Tin tức</span>
            </li>
            <li style={{ marginRight: 12, marginLeft: 12 }}>
              <span>Liên hệ</span>
            </li>
            <li style={{ marginLeft: 12 }}>
              <Popover
                trigger='click'
                arrow={false}
                placement='bottomRight'
                content={<MenuHeader user={user} hide={hide} />}
                open={open}
                onOpenChange={handleOpenChange}
              >
                {user?.isAuthenticated === false ? (
                  <Link to={ROUTE_PATH.LOGIN} style={{ textDecoration: 'none', color: '#000' }}>
                    <span className={clsx(styles.show)}>Đăng nhập</span>
                  </Link>
                ) : (
                  <span className={clsx(styles.show, 'flex items-center gap-2')}>
                    {user?.account?.getUser?.name}

                    <Icon className='w-5 h-5' icon='icon-arrow-down' />
                  </span>
                )}
              </Popover>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeaderRow1;
