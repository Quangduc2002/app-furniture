import Button from '@/components/UI/Button/Button';
import InputPassword from '@/components/UI/InputPassword';
import InputText from '@/components/UI/InputText';
import { Col, Form, Row } from 'antd';
import clsx from 'clsx';
import styles from '../Login.module.scss';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import { REG_EMAIL } from '@/utils/reg';
import { useRequest } from 'ahooks';
import { serviceLogin } from '../service';
import { useAtom } from 'jotai';
import { userDefault } from '@/store/Login/type';
import { toast } from '@/components/UI/Toast/toast';

interface IFormSignIn {
  setShowLogin: (value: boolean) => void;
}

function FormSignIn({ setShowLogin }: IFormSignIn) {
  const [form] = Form.useForm();
  const [, setUser] = useAtom(userDefault);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('redirect');
  const { run: login } = useRequest(serviceLogin, {
    manual: true,
    onSuccess: (res) => {
      //lấy tên người dùng
      let roles = res.data.DT.roles;
      let token = res.data.DT.access_token;
      let getUser = res.data.DT.getUser;
      localStorage.setItem('accessToken', res.data.DT.access_token);
      localStorage.setItem('refreshToken', res.data.DT.refresh_token);
      let data = {
        account: { roles, token, getUser },
        isAuthenticated: true,
      };
      setUser(data);

      if (res.data.user.roleId === 1) {
        navigate(searchParam ? searchParam : ROUTE_PATH.HOME);
        toast.success('Đăng nhập thành công !');
      } else {
        navigate(ROUTE_PATH.REVENUA);
        toast.success('Đăng nhập thành công !');
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
  const onFinish = (value: any) => {
    login({ email: value.email, password: value.password });
  };
  return (
    <div className={clsx('flex justify-center items-center')}>
      <div className={clsx(styles.nav2_form)}>
        <div className={clsx(styles.form_header)}>
          <h3 className={clsx(styles.form_heading)}>Đăng Nhập</h3>
          <h4 onClick={() => setShowLogin(false)} className={clsx(styles.form_heading__h4)}>
            Đăng Kí
          </h4>
        </div>
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                name='email'
                className='!my-2'
                rules={[
                  { required: true, message: 'Email là bắt buộc' },
                  { pattern: REG_EMAIL, message: 'Email không hợp lệ' },
                ]}
              >
                <InputText placeholder='Nhập email' />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name='password'
                className='!my-2'
                rules={[{ required: true, message: 'Mật khẩu là bắt buộc' }]}
              >
                <InputPassword placeholder='Nhập mật khẩu' />
              </Form.Item>
            </Col>
          </Row>
          <div className={clsx(styles.form_controls, styles.form_controls1)}>
            <Button htmlType='submit' className={clsx(styles.form_btn, styles.form_primary)}>
              ĐĂNG NHẬP
            </Button>

            <Link className={clsx(styles.form_btn__link)} to={ROUTE_PATH.HOME}>
              <Button className={clsx(styles.form_btn)}>TRỞ LẠI</Button>
            </Link>
          </div>
          <div className={clsx(styles.form_controls2)}>
            <NavLink to={ROUTE_PATH.FINDACCOUNT} className={clsx(styles.controls2_p)}>
              Quên mật khẩu
            </NavLink>
            <p>Cần trợ giúp</p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default FormSignIn;
