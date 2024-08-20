import React, { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './FindAcounts.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { serviceFindAccount } from '../service';
import { ROUTE_PATH } from '@/routes/route.constant';
function FindAccounts({ handleCancel }: any) {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState('');

  const { run: findAccount } = useRequest(serviceFindAccount, {
    manual: true,
    onSuccess: (res) => {
      localStorage.setItem('account', JSON.stringify(res.data.user));
      navigate(ROUTE_PATH.RECOVER);
      setError('');
    },
    onError: (err: any) => {
      setError(err.response.data.message);
    },
  });

  const handleFindUser = (e: any) => {
    e.preventDefault();
    if (email) {
      findAccount(email);
    }
  };
  return (
    <div className={clsx(styles.find)}>
      <div className={clsx(styles.header)}>
        <h2>Tìm kiếm tài khoản của bạn</h2>
      </div>
      <div className={clsx(styles.container)}>
        <p>Vui lòng nhập email để tìm kiếm tài khoản của bạn</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Vui lòng nhập email'
        />
        {error && (
          <div style={{ marginTop: 8 }}>
            <span className={clsx(styles.form_message)}>{error}</span>
          </div>
        )}
      </div>
      <div className={clsx(styles.footer)}>
        <NavLink to={'/Login'}>
          <button onClick={handleCancel} className={clsx(styles.footer_btn)}>
            Hủy
          </button>
        </NavLink>
        <button
          onClick={handleFindUser}
          className={clsx(styles.footer_btn, styles.footer_btn__find)}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}

export default FindAccounts;
