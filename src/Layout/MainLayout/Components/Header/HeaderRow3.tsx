import clsx from 'clsx';
import styles from '../../index.module.scss';
import { ROUTE_HEADER } from './Header.Constant';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@/components/UI/IconFont/Icon';
import { ROUTE_PATH } from '@/routes/route.constant';
import { useAtom } from 'jotai';
import { atomListCartUser } from '@/store/type';

function HeaderRow3() {
  const [listCartUser] = useAtom(atomListCartUser);

  return (
    <div className={clsx(styles.top2, styles.devices)}>
      <div className={clsx(styles.wrapper3, 'px-8')}>
        <ul>
          {ROUTE_HEADER.map((link) => {
            return (
              <li key={link.id}>
                <NavLink className={clsx(styles.wrapper3_link, 'items-center')} to={link.href}>
                  <span className='text-white'>{link.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        {/* {roleId !== '0' ? ( */}
        <Link to={ROUTE_PATH.CART} className={clsx(styles.cart, 'gap-2')}>
          <>
            <span className='text-lg'>Giỏ hàng</span>
            <Icon icon='icon-cart' />
          </>
          {/* <span className={clsx(styles.cartSL, 'text-base')}>0</span> */}
          <span className={clsx(styles.cartSL, 'py-1 text-[12px]')}>
            {listCartUser ? listCartUser.length : 0}
          </span>
        </Link>
        {/* ) : (
        ''
      )} */}
      </div>
    </div>
  );
}

export default HeaderRow3;
