import React from 'react';
import clsx from 'clsx';
import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';
import { ROUTE_HEADER } from '../Header/Header.Constant';

function Footer() {
  return (
    <div className={clsx(styles.Footer)}>
      <div className={clsx(styles.Footer1, 'max-w-[1440px] m-auto')}>
        <div>
          <ul>
            <h2 className={clsx(styles.Footer1_section)}>Hệ thống cửa hàng</h2>
            <li>
              <i className={clsx(styles.Footer1_i, 'fa-solid fa-location-dot')}></i>
              <span className={clsx(styles.Footer1_span)}>
                Địa chỉ: Đại Nghiệp-Tân Dân-Phú Xuyên-Hà Nội
              </span>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <h2 className={clsx(styles.Footer1_section)}>Danh mục</h2>
            {ROUTE_HEADER.map((link: any) => {
              return (
                <li key={link.id}>
                  <NavLink key={link.id} className={clsx(styles.Footer1_link)} to={link.href}>
                    {link.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <ul>
            <h2 className={clsx(styles.Footer1_section)}>Chấp nhận thanh toán</h2>
            <li>
              <img className={clsx(styles.Footer1_card)} src={'/Images/payment.png'} alt='' />
            </li>
            <li className={clsx(styles.Footer1_icon, 'items-center')}>
              <img className='w-[48px] h-[48px]' src={'/Images/phone_footer.png'} alt='' />
              <div className={clsx(styles.Footer1_iconbox)}>
                <p style={{ color: '#f62d3e' }}>0965420922</p>
                <p>Phục vụ 24/24, cả thứ 7 & CN</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
