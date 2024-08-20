import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Recover.module.scss';
import { useRequest } from 'ahooks';
import { serviceRecover } from '../service';
import { ROUTE_PATH } from '@/routes/route.constant';

function Recover({ handleCancel }: any) {
  const navigate = useNavigate();
  const [option, setOption] = useState('');
  const [error, setError] = useState('');
  const [account, setAccount] = useState<any>();

  useEffect(() => {
    const storedAccounts = localStorage.getItem('account');
    if (storedAccounts) {
      setAccount(JSON.parse(storedAccounts));
    }
  }, []);

  const { run: runRecover } = useRequest(serviceRecover, {
    manual: true,
    onSuccess: (res) => {},
    onError: (err: any) => {
      setError(err.response.data.message);
    },
  });

  const handleSendEmail = (e: any) => {
    e.preventDefault();
    navigate(ROUTE_PATH.ENTERCODE);

    runRecover({
      user: JSON.parse(localStorage.account),
      options: option,
    });
    // axios
    //   .post('http://localhost:8080/user/sendEmail', {
    //     user: JSON.parse(localStorage.account),
    //     options: option,
    //   })
    //   .then((res) => {
    //     // navigate('/Login/EnterCode');
    //   })
    //   .catch((err) => {
    //     setError(err.response.data.message);
    //   });
  };

  console.log(option);

  return (
    <div className={clsx(styles.recover)}>
      <div className={clsx(styles.header)}>
        <h2>Đặt lại mật khẩu của bạn</h2>
      </div>
      <div className={clsx(styles.container)}>
        <div style={{ width: '60%' }}>
          <h3>Bạn muốn nhận mã để đặt lại mật khẩu theo cách nào ?</h3>
          <div className={clsx(styles.container_option)}>
            <input
              id='email'
              type='radio'
              name='option'
              value='email'
              onChange={(e) => setOption(e.target.value)}
            />
            <label htmlFor='email' className={clsx(styles.container_option__label)}>
              <p>Gửi mã qua email</p>
              <p> {account?.email}</p>
            </label>
          </div>

          <div className={clsx(styles.container_option)}>
            <input
              id='phoneNumber'
              name='option'
              type='radio'
              value='phoneNumber'
              onChange={(e) => setOption(e.target.value)}
            />
            <label htmlFor='phoneNumber' className={clsx(styles.container_option__label)}>
              <p>Gửi mã qua SMS</p>
              <p> {account?.soDT}</p>
            </label>
          </div>
          {error && (
            <div style={{ marginTop: 8 }}>
              <span className={clsx(styles.form_message)}>{error}</span>
            </div>
          )}
        </div>
        <div className='flex items-center justify-center w-2/5'>
          <div className='text-center'>
            <img
              className={clsx(
                styles.add_formGroup__img,
                'w-[60px] h-[60px] rounded-full border boder-[#dbdbdb]',
              )}
              src={`${account?.image}`}
              alt=''
            />
            <p> {account?.name}</p>
          </div>
        </div>
      </div>
      <div className={clsx(styles.footer)}>
        <NavLink to={ROUTE_PATH.FINDACCOUNT}>
          <button onClick={handleCancel} className={clsx(styles.footer_btn)}>
            Hủy
          </button>
        </NavLink>
        <button
          onClick={(e) => handleSendEmail(e)}
          className={clsx(styles.footer_btn, styles.footer_btn__find)}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default Recover;
