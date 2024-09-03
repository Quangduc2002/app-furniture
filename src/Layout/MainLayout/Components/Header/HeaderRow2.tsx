import { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from '../../index.module.scss';
import { Icon } from '@/components/UI/IconFont/Icon';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ROUTE_HEADER, ROUTE_HEADER_PROFILE } from './Header.Constant';
import { useAtom } from 'jotai';
import { userDefault } from '@/store/Login/type';
import useLogout from '@/store/Logout/Logout';
import { Drawer } from 'antd';
import getListProducts from '@/store/Home/ListProducts';
import { atomProducts } from '@/store/Home/type';
import { atomListCartUser } from '@/store/type';
import { ROUTE_PATH } from '@/routes/route.constant';

const ModalMenu = ({ onClose }: any) => {
  const [user] = useAtom(userDefault);
  const [show2, setShow2] = useState(false);
  const { logoutUser } = useLogout();
  const handleLogOutUser = () => {
    logoutUser();
  };
  return (
    <div>
      <ul>
        <li className={'flex justify-end px-[16px]'}>
          <Icon onClick={() => onClose()} icon={'icon-close-line'} className={'text-2xl '} />
        </li>
        <li className='text-center'>
          <img className='w-[200px] m-auto' alt='' src={'/Images/Logo.png'} />
        </li>

        <ul>
          {ROUTE_HEADER?.concat(ROUTE_HEADER_PROFILE)
            ?.concat(
              user?.account?.getUser?.roleId !== 1
                ? [
                    {
                      id: 'manageProduct',
                      title: 'Quản lý sản phẩm',
                      href: ROUTE_PATH.REVENUA,
                    },
                  ]
                : [],
            )
            ?.map((link, index) => {
              return (
                <li key={link.id} className='!border-b-[1px] border-gray'>
                  <NavLink
                    onClick={() => (setShow2(!show2), onClose())}
                    className={clsx(styles.wrapper3_link, 'items-center')}
                    to={link.href}
                  >
                    <span>{link.title}</span>
                  </NavLink>
                </li>
              );
            })}

          {/* {user?.isAuthenticated === true ? (
            <li>
              {user.account && user.account.getUser.roleId !== 1 ? (
                <Link
                  to={`admin`}
                  style={{ textDecoration: 'none' }}
                  className={clsx(styles.wrapper3_link)}
                >
                  <li>Quản lý sản phẩm</li>
                </Link>
              ) : (
                ''
              )}

              <Link to={'a'} className={clsx(styles.wrapper3_link)}>
                Hồ sơ cá nhân
              </Link>
            </li>
          ) : (
            ''
          )} */}
        </ul>

        <div className={clsx(styles.wrapper3_btn)}>
          {user?.isAuthenticated === false ? (
            <Link to='/Login' style={{ textDecoration: 'none', color: '#000' }}>
              <button className={clsx(styles.wrapper3__btn)}>Đăng nhập</button>
            </Link>
          ) : (
            <button className={clsx(styles.wrapper3__btn)} onClick={() => handleLogOutUser()}>
              Đăng xuất
            </button>
          )}
        </div>
      </ul>
    </div>
  );
};

function HeaderRow2() {
  const [listCartUser] = useAtom(atomListCartUser);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const { handleSearch } = getListProducts({ valueSearch: searchValue });
  const [products] = useAtom(atomProducts);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const HandleOnSubmit = () => {
    handleSearch(searchValue);
    navigate(`?search=${searchValue}`);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.target.blur();
      setFocus(false);
      HandleOnSubmit();
    }
  };

  const filteredItems = products.filter((item: any) => {
    return item?.tenSp?.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <div className={clsx(styles.wrapper2, 'lg:hidden xs:flex px-8')}>
        <div onClick={showDrawer} className={clsx(styles.bars)}>
          <Icon icon='icon-hamburger-menu' />
        </div>
        <Drawer placement={'left'} closable={false} onClose={onClose} open={open}>
          <ModalMenu onClose={onClose} />
        </Drawer>
        <Link to='/'>
          <img alt='' src={'/Images/Logo.png'} />
        </Link>
        {/* {roleId !== '0' ? ( */}
        <Link to='/giohang' className={clsx(styles.cart, styles.cartMB)}>
          <Icon icon='icon-cart' />
          <span className={clsx(styles.cartSL, 'py-1 text-[12px]')}>
            {listCartUser ? listCartUser.length : 0}
          </span>
        </Link>
        {/* ) : (
        ''
      )} */}

        <div className={clsx(styles.wrapper2_search, 'lg:block max-lg:hidden')}>
          <div className='flex'>
            <input
              className={clsx(styles.input)}
              value={searchValue}
              onChange={(event: any) => setSearchValue(event.target.value)}
              placeholder='Tìm kiếm...'
              onKeyDown={(e) => handleKeyPress(e)}
              onFocus={() => setFocus(true)}
            />

            <button onClick={HandleOnSubmit}>
              <Icon icon='icon-search' className='text-[18px]' color='text-icon' />
            </button>
          </div>

          {filteredItems.length !== 0 && searchValue && (
            <ul
              className={clsx(
                styles.wrapper2_search__ul,
                styles.ul,
                focus ? '' : styles.wrapper2_active,
              )}
            >
              {filteredItems.map((product: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSearchValue(product.tenSp);
                  }}
                >
                  <div className='flex gap-4'>
                    <Icon icon='icon-search' className='text-[#555] text-[14px]' />
                    {product.tenSp}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={clsx(styles.wrapper2_phone, 'lg:flex max-lg:hidden')}>
          <img alt='' src='/Images/telephone.png' />
          <div className={clsx(styles.wrapper2_hotline)}>
            <p style={{ fontWeight: 700 }}>Hotline</p>
            <p>0965420922</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderRow2;
