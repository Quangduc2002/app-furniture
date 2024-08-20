import React, { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './PasswordNew.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from '@/components/UI/Toast/toast';
import { useRequest } from 'ahooks';
import { serviceUpdatePassword } from '../service';
import { Icon } from '@/components/UI/IconFont/Icon';
import { ROUTE_PATH } from '@/routes/route.constant';

function PasswordNew({ handleCancel }: any) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);
  const { run: runPasswordNew } = useRequest(serviceUpdatePassword, {
    manual: true,
    onSuccess: (res) => {
      toast.success(res.data.message);
      navigate(ROUTE_PATH.LOGIN);
      setError('');
    },
    onError: (err: any) => {
      setError(err.response.data.message);
    },
  });

  const updatePassword = (e: any) => {
    e.preventDefault();
    runPasswordNew({ user: JSON.parse(localStorage.account), password: password });
  };
  return (
    <div className={clsx(styles.PassWordNew)}>
      <div className={clsx(styles.header)}>
        <h2>Chọn mật khẩu mới</h2>
      </div>
      <div className={clsx(styles.container)}>
        <p>Tạo mật khẩu mới có tối thiểu 6 ký tự.</p>
        <div style={{ position: 'relative' }}>
          <input
            type={check === true ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Mật khẩu mới'
          />
          <Icon
            icon={check === true ? 'icon-eye' : 'icon-eye-closed'}
            onClick={() => {
              setCheck(!check);
            }}
            className={clsx(styles.auth_froup__eye)}
          />
        </div>
        {error && (
          <div style={{ marginTop: 8 }}>
            <span className={clsx(styles.form_message)}>{error}</span>
          </div>
        )}
      </div>
      <div className={clsx(styles.footer)}>
        <NavLink to={'/Login'}>
          <button onClick={handleCancel} className={clsx(styles.footer_btn)}>
            Bỏ qua
          </button>
        </NavLink>
        <button
          onClick={(e) => updatePassword(e)}
          className={clsx(styles.footer_btn, styles.footer_btn__find)}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}

export default PasswordNew;
