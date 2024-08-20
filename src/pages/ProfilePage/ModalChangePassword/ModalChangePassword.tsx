import ModalCustom from '@/components/UI/Modal';
import clsx from 'clsx';
import { ModalIprops } from '@/components/UI/Modal/type';
import styles from '../index.module.scss';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { serviceChangePassword } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import { Icon } from '@/components/UI/IconFont/Icon';

function ModalChangePassword({ children, setVisible, visible, user }: ModalIprops) {
  const [currentPass, setCurrentPass] = useState('');
  const [passNew, setPassNew] = useState('');
  const [enterPass, setEnterPass] = useState('');
  const [checkError, setCheckError] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const { run: changePassword } = useRequest(serviceChangePassword, {
    manual: true,
    onSuccess: (res) => {
      toast.success('Đổi mật khẩu thành công ');
      setCheckError(res.data.errCode);
      setCurrentPass('');
      setPassNew('');
      setEnterPass('');
      setVisible(false);
    },
    onError: (error: any) => {
      setCheckError(error.response.data.errCode);
      toast.error(error.response.data.message);
    },
  });

  const handleChangePass = (e: any) => {
    e.preventDefault();
    if (passNew === enterPass && passNew !== currentPass && currentPass && enterPass && passNew) {
      changePassword(user?.account?.getUser?.id, {
        currentPass: currentPass,
        password: passNew,
      });
    }
  };
  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom open={visible} onCancel={() => setVisible(false)}>
        <div>
          <div className={clsx(styles.container_model__title)}>
            <h3 className='text-xl'>Đổi mật khẩu</h3>
            <p>Mật khẩu của bạn phải có ít nhất 6 ký tự</p>
          </div>

          <form className={clsx(styles.auth_form)}>
            <div style={{ position: 'relative' }} className={clsx(styles.auth_froup)}>
              <div style={{ position: 'relative' }}>
                <input
                  value={currentPass}
                  type={check1 === true ? 'text' : 'password'}
                  name='password'
                  className={clsx(
                    styles.auth_input,
                    checkError && +checkError === 1 && styles.auth_input__active,
                  )}
                  placeholder='Mật khẩu hiện tại'
                  onChange={(e) => setCurrentPass(e.target.value)}
                />
                <Icon
                  onClick={() => {
                    setCheck1(!check1);
                  }}
                  icon={check1 === true ? 'icon-eye' : 'icon-eye-closed'}
                  className={clsx(styles.auth_froup__eye)}
                />
              </div>
              <div>
                <p className={clsx(styles.form_message, 'mt-2')}>
                  {+checkError === 1 ? 'Sai mật khẩu hiện tại.' : ''}
                </p>
              </div>
            </div>

            <div style={{ position: 'relative' }} className={clsx(styles.auth_froup)}>
              <div style={{ position: 'relative' }}>
                <input
                  value={passNew}
                  type={check2 === true ? 'text' : 'password'}
                  name='password'
                  className={clsx(
                    styles.auth_input,
                    passNew && (passNew.length < 6 || passNew === currentPass)
                      ? styles.auth_input__active
                      : '',
                  )}
                  placeholder='Mật khẩu mới'
                  onChange={(e) => setPassNew(e.target.value)}
                />
                <Icon
                  onClick={() => {
                    setCheck2(!check2);
                  }}
                  icon={check2 === true ? 'icon-eye' : 'icon-eye-closed'}
                  className={clsx(styles.auth_froup__eye)}
                />
              </div>
              <div>
                {passNew && (
                  <p className={clsx(styles.form_message, 'mt-2')}>
                    {passNew.length < 6
                      ? 'Vui lòng nhập ít nhất 6 ký tự.'
                      : passNew === currentPass
                      ? 'Mật khẩu mới phải khác mật khẩu hiện tại.'
                      : ''}
                  </p>
                )}
              </div>
            </div>

            <div style={{ position: 'relative' }} className={clsx(styles.auth_froup)}>
              <div style={{ position: 'relative' }}>
                <input
                  value={enterPass}
                  type={check3 === true ? 'text' : 'password'}
                  name='password'
                  className={clsx(
                    styles.auth_input,
                    enterPass && passNew !== enterPass ? styles.auth_input__active : '',
                  )}
                  placeholder='Nhập lại mật khẩu mới'
                  onChange={(e) => setEnterPass(e.target.value)}
                />
                <Icon
                  onClick={() => {
                    setCheck3(!check3);
                  }}
                  icon={check3 === true ? 'icon-eye' : 'icon-eye-closed'}
                  className={clsx(styles.auth_froup__eye)}
                />
              </div>
              <div>
                {enterPass && (
                  <p className={clsx(styles.form_message, 'mt-2')}>
                    {passNew !== enterPass ? 'Mật khẩu mới không khớp.' : ''}
                  </p>
                )}
              </div>
            </div>

            <div className={clsx(styles.container_model__btn)}>
              <p
                className={clsx(
                  passNew === enterPass &&
                    passNew !== currentPass &&
                    currentPass &&
                    enterPass &&
                    passNew
                    ? ''
                    : styles.active,
                )}
                onClick={handleChangePass}
              >
                Đổi mật khẩu
              </p>
            </div>
          </form>
        </div>
      </ModalCustom>
    </>
  );
}

export default ModalChangePassword;
