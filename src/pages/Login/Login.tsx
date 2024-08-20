import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from '@/components/UI/Toast/toast';
import styles from './Login.module.scss';
import { Icon } from '@/components/UI/IconFont/Icon';
import { ROUTE_PATH } from '@/routes/route.constant';
import { useRequest } from 'ahooks';
import { serviceLogin, serviceRegister } from './service';
import { useAtom } from 'jotai';
import { userDefault } from '@/store/Login/type';
import { curDate, Days, Months, Years } from '@/utils/FormatDate';
import { Sexs } from '@/utils/Stars';

function Login() {
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [registerEmail, setRegisterEmail] = useState<any>('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [Day, setDay] = useState('');
  const [Month, setMonth] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [Year, setYear] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [showForgotPass, setShowForgotPass] = useState(true);
  const [formErrors, setFormErrors] = useState<any>({});
  const navigate = useNavigate();
  const [, setUser] = useAtom(userDefault);

  const validateForm = () => {
    let errors: any = {};
    let isValid = true;

    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!email) {
      errors.email = 'Please enter Email !';
      isValid = false;
    } else if (!regex.test(email)) {
      errors.email = 'Please enter correct email format !';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Please enter Password !';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Please enter at least 6 characters !';
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const validateFormRegister = () => {
    let errors: any = {};
    let isValid = true;

    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (!registerEmail) {
      errors.registerEmail = 'Please enter Email !';
      isValid = false;
    } else if (!regex.test(registerEmail)) {
      errors.registerEmail = 'Please enter correct email format !';
      toast.error('Vui lòng nhập đúng định dạng email !');
      isValid = false;
    }

    if (!registerPassword) {
      errors.registerPassword = 'Please enter Password !';
      isValid = false;
    } else if (registerPassword.length < 6) {
      errors.registerPassword = 'Please enter at least 6 characters !';
      toast.error('Vui lòng nhập mật khẩu ít nhất 6 ký tự !');
      isValid = false;
    }

    if (!surname) {
      errors.registerSurName = 'Please enter full name !';
      isValid = false;
    }

    if (!name) {
      errors.registerName = 'Please enter full name !';
      isValid = false;
    }

    if (!Day || !Month || !Year) {
      errors.registerNS = 'Please enter DateOfBirth !';
      isValid = false;
    }

    if (!gioiTinh) {
      errors.gioiTinh = 'Please enter sex !';
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const { run: login } = useRequest(() => serviceLogin({ email, password }), {
    manual: true,
    onSuccess: (res) => {
      //lấy tên người dùng
      let roles = res.data.DT.roles;
      let token = res.data.DT.access_token;
      let getUser = res.data.DT.getUser;
      localStorage.setItem('jwt', res.data.DT.access_token);
      let data = {
        account: { roles, token, getUser },
        isAuthenticated: true,
      };
      setUser(data);

      if (res.data.user.roleId === 1) {
        navigate(ROUTE_PATH.HOME);
        toast.success('Đăng nhập thành công !');
      } else {
        navigate(ROUTE_PATH.REVENUA);
        toast.success('Đăng nhập thành công !');
      }
      // else if (res.data.user.roleId === 3) {
      //   navigate('/admin/Revenue');
      //   toast.success('Đăng nhập thành công !');
      // }
    },
    onError: (e: any) => {
      toast.error('Tài khoản mật khẩu chưa chính xác');
    },
  });

  const { run: register } = useRequest(serviceRegister, {
    manual: true,
    onSuccess: (res) => {
      toast.success('Đăng kí thành công !');
      setRegisterEmail('');
      setRegisterPassword('');
      setSurname('');
      setName('');
      setDay('');
      setMonth('');
      setYear('');
      setGioiTinh('');
    },
    onError: (err: any) => {
      if (err.response.data.errCode === 1) {
        toast.error(err.response.data.message);
      }
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      login();
    }
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (validateFormRegister()) {
      register({
        email: registerEmail,
        password: registerPassword,
        name: surname + ' ' + name,
        roleId: '1',
        ngaySinh: Day,
        thangSinh: Month,
        namSinh: Year,
        gioiTinh: gioiTinh,
        image: 'avt-default.jpg',
      });
    }
  };

  return (
    <>
      {showLogin ? (
        showForgotPass ? (
          <div className={clsx('flex justify-center items-center')}>
            <div className={clsx(styles.nav2_form)}>
              <div className={clsx(styles.form_header)}>
                <h3 className={clsx(styles.form_heading)}>Đăng Nhập</h3>
                <h4 onClick={() => setShowLogin(false)} className={clsx(styles.form_heading__h4)}>
                  Đăng Kí
                </h4>
              </div>
              <form method='POST' action='/user/login' className={clsx(styles.auth_form)}>
                <div className={clsx(styles.auth_froup)}>
                  <input
                    value={email}
                    type='text'
                    name='email'
                    className={clsx(styles.auth_input, formErrors.email ? styles.auth_isValid : '')}
                    placeholder='Nhập Email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div>
                    {formErrors.email && (
                      <p className={clsx(styles.form_message)}>{formErrors.email}</p>
                    )}
                  </div>
                </div>
                <div style={{ position: 'relative' }} className={clsx(styles.auth_froup)}>
                  <div style={{ position: 'relative' }}>
                    <input
                      value={password}
                      type={check === true ? 'text' : 'password'}
                      name='password'
                      className={clsx(
                        styles.auth_input,
                        formErrors.password ? styles.auth_isValid : '',
                      )}
                      placeholder='Nhập mật khẩu'
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Icon
                      onClick={() => {
                        setCheck(!check);
                      }}
                      icon={check === true ? 'icon-eye' : 'icon-eye-closed'}
                      className={clsx(styles.auth_froup__eye)}
                    />
                  </div>
                  <div>
                    {formErrors.password && (
                      <p className={clsx(styles.form_message)}>{formErrors.password}</p>
                    )}
                  </div>
                </div>
                <div className={clsx(styles.form_controls, styles.form_controls1)}>
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className={clsx(styles.form_btn, styles.form_primary)}
                  >
                    ĐĂNG NHẬP
                  </button>

                  <Link className={clsx(styles.form_btn__link)} to={ROUTE_PATH.HOME}>
                    <button className={clsx(styles.form_btn)}>TRỞ LẠI</button>
                  </Link>
                </div>
                <div className={clsx(styles.form_controls2)}>
                  <NavLink to={ROUTE_PATH.FINDACCOUNT} className={clsx(styles.controls2_p)}>
                    Quên mật khẩu
                  </NavLink>
                  <p>Cần trợ giúp</p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          //   <FindAccounts setShowForgotPass={setShowForgotPass} showForgotPass={showForgotPass} />
          ''
        )
      ) : (
        <div className={clsx('flex justify-center items-center')}>
          <div className={clsx(styles.nav2_form)}>
            <div className={clsx(styles.form_header)}>
              <h3 className={clsx(styles.form_heading)}>Đăng Kí</h3>
              <h4 onClick={() => setShowLogin(true)} className={clsx(styles.form_heading__h4)}>
                Đăng Nhập
              </h4>
            </div>
            <form method='POST' action='/user/register' className={clsx(styles.auth_form)}>
              <div className={clsx(styles.auth_froup)}>
                <div className={clsx(styles.auth_froup__name)}>
                  <div className={clsx(styles.auth_froup__emptyInput)} style={{ marginRight: 10 }}>
                    <input
                      value={surname}
                      type='text'
                      className={clsx(
                        styles.auth_input,
                        formErrors.registerSurName ? styles.auth_isValid : '',
                      )}
                      placeholder='Nhập Họ'
                      onChange={(e) => setSurname(e.target.value)}
                    />
                    {formErrors.registerSurName ? (
                      <Icon
                        icon='icon-circle-excleamation'
                        className={clsx(
                          styles.auth_froup__emptyIcon,
                          styles.auth_froup__emptyIconName,
                        )}
                      />
                    ) : (
                      ''
                    )}
                  </div>

                  <div className={clsx(styles.auth_froup__emptyInput)} style={{ marginLeft: 10 }}>
                    <input
                      value={name}
                      type='text'
                      className={clsx(
                        styles.auth_input,
                        formErrors.registerName ? styles.auth_isValid : '',
                      )}
                      placeholder='Nhập Tên'
                      onChange={(e) => setName(e.target.value)}
                    />
                    {formErrors.registerName ? <Icon icon='icon-circle-excleamation' /> : ''}
                  </div>
                </div>
              </div>

              <div className={clsx(styles.auth_froup)}>
                <div className={clsx(styles.auth_froup__emptyInput)}>
                  <input
                    value={registerEmail}
                    type='text'
                    name='email'
                    className={clsx(
                      styles.auth_input,
                      formErrors.registerEmail ? styles.auth_isValid : '',
                    )}
                    placeholder='Nhập Email'
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                  {formErrors.registerEmail ? (
                    <i className={clsx(styles.auth_froup__emptyIcon)}></i>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className={clsx(styles.auth_froup)}>
                <div className={clsx(styles.auth_froup__emptyInput)}>
                  <input
                    value={registerPassword}
                    type={check === true ? 'text' : 'password'}
                    name='password'
                    className={clsx(
                      styles.auth_input,
                      formErrors.registerPassword ? styles.auth_isValid : '',
                    )}
                    placeholder='Nhập mật khẩu'
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  {formErrors.registerPassword ? (
                    <i className={clsx(styles.auth_froup__emptyIcon)}></i>
                  ) : (
                    <Icon
                      onClick={() => {
                        setCheck(!check);
                      }}
                      icon={check === true ? 'icon-eye' : 'icon-eye-closed'}
                      className={clsx(styles.auth_froup__eye)}
                    />
                  )}
                </div>
              </div>

              <div className={clsx(styles.auth_froup)}>
                <div className={clsx(styles.auth_froup__emptySelect)}>
                  <p className={clsx(styles.auth_froup_p)}>Ngày sinh</p>
                  {formErrors.registerNS ? (
                    <i className={clsx(styles.auth_froup__emptyIconSelect)}></i>
                  ) : (
                    ''
                  )}
                </div>

                <div className={clsx(styles.auth_froup_date)}>
                  <select
                    className={clsx(formErrors.registerNS ? styles.auth_isValid : '')}
                    value={Day}
                    onChange={(e) => setDay(e.target.value)}
                  >
                    <option style={{ display: 'none' }}>{curDate.getDay() + 1}</option>
                    {Days.map((day: any, index: number) => {
                      return (
                        <option key={index} value={day}>
                          {day}
                        </option>
                      );
                    })}
                  </select>

                  <select
                    className={clsx(formErrors.registerNS ? styles.auth_isValid : '')}
                    value={Month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option style={{ display: 'none' }}>Tháng {curDate.getMonth() + 1}</option>
                    {Months.map((month: any) => {
                      return (
                        <option key={month} value={month}>
                          Tháng {month}
                        </option>
                      );
                    })}
                  </select>

                  <select
                    className={clsx(formErrors.registerNS ? styles.auth_isValid : '')}
                    value={Year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option style={{ display: 'none' }}>{curDate.getFullYear()}</option>
                    {Years.map((year: any) => {
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className={clsx(styles.auth_froup)}>
                <div className={clsx(styles.auth_froup__emptySelect)}>
                  <p className={clsx(styles.auth_froup_p)}>Giới tính</p>
                  {formErrors.gioiTinh ? (
                    <i className={clsx(styles.auth_froup__emptyIconSelect)}></i>
                  ) : (
                    ''
                  )}
                </div>

                <div className={clsx(styles.auth_froup__sex)}>
                  {Sexs.map((sex) => {
                    return (
                      <div
                        key={sex.id}
                        className={clsx(
                          styles.auth_froup__sex__container,
                          formErrors.gioiTinh ? styles.auth_isValid : '',
                        )}
                      >
                        <label style={{ width: '100%' }} htmlFor={`sex-${sex.id}`}>
                          {sex.name}
                        </label>
                        <input
                          id={`sex-${sex.id}`}
                          type='radio'
                          name='gioitinh'
                          value={sex.id}
                          onChange={(e) => setGioiTinh(e.target.value)}
                          checked={gioiTinh && sex.id === +gioiTinh ? true : false}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'none' }} className={clsx(styles.auth_froup)}>
                <input value='1' type='text' className={clsx(styles.auth_input)} />
              </div>

              <div
                style={{ marginBottom: 80 }}
                className={clsx(styles.form_controls, styles.form_controls1)}
              >
                <Link className={clsx(styles.form_btn__link)} to={ROUTE_PATH.HOME}>
                  <button className={clsx(styles.form_btn)}>TRỞ LẠI</button>
                </Link>
                <button
                  onClick={(e) => handleRegister(e)}
                  className={clsx(styles.form_btn, styles.form_primary)}
                >
                  ĐĂNG Kí
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
