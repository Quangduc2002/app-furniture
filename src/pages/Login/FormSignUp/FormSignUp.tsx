import Button from '@/components/UI/Button/Button';
import InputPassword from '@/components/UI/InputPassword';
import InputText from '@/components/UI/InputText';
import { REG_EMAIL } from '@/utils/reg';
import { Col, Form, Radio, Row, Select } from 'antd';
import clsx from 'clsx';
import styles from '../Login.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import { DaySelects, MonthSelects, YearSelects } from '@/utils/FormatDate';
import { useRequest } from 'ahooks';
import { serviceRegister } from '../service';
import { toast } from '@/components/UI/Toast/toast';

interface IFormSignIn {
  setShowLogin: (value: boolean) => void;
}
function FormSignUp({ setShowLogin }: IFormSignIn) {
  const [form] = Form.useForm();
  const { run: register } = useRequest(serviceRegister, {
    manual: true,
    onSuccess: (res) => {
      toast.success('Đăng kí thành công !');
      form.resetFields();
    },
    onError: (err: any) => {
      if (err.response.data.errCode === 1) {
        toast.error(err.response.data.message);
      }
    },
  });
  const onFinish = (value: any) => {
    register({
      email: value.email,
      password: value.password,
      name: value.firstName + ' ' + value.lastName,
      roleId: '1',
      ngaySinh: value.ngaySinh,
      thangSinh: value.thangSinh,
      namSinh: value.namSinh,
      gioiTinh: value.gioiTinh,
      image:
        'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F24f868a3-7e99-481e-b7ca-f905d57a669b?alt=media&token=a7591db7-7581-49ab-995a-a2492022d1fc',
    });
  };
  return (
    <div className={clsx('flex justify-center items-center')}>
      <div className={clsx(styles.nav2_form)}>
        <div className={clsx(styles.form_header)}>
          <h3 className={clsx(styles.form_heading)}>Đăng Kí</h3>
          <h4 onClick={() => setShowLogin(true)} className={clsx(styles.form_heading__h4)}>
            Đăng Nhập
          </h4>
        </div>
        <Form layout='vertical' onFinish={onFinish} form={form} className='form-sign-up'>
          <Row className='justify-between'>
            <Col span={11}>
              <Form.Item
                name='firstName'
                rules={[{ required: true, message: 'Họ tên là bắt buộc' }]}
              >
                <InputText placeholder='Nhập họ' />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name='lastName' rules={[{ required: true, message: 'Tên là bắt buộc' }]}>
                <InputText placeholder='Nhập tên' />
              </Form.Item>
            </Col>
          </Row>
          <Col>
            <Form.Item
              name='email'
              className='!my-6'
              rules={[
                { required: true, message: 'Email là bắt buộc' },
                { pattern: REG_EMAIL, message: 'Email không hợp lệ' },
              ]}
            >
              <InputText placeholder='Nhập email@gmail.com' />
            </Form.Item>
          </Col>
          <Form.Item
            name='password'
            className='!my-6'
            rules={[
              { required: true, message: 'Mật khẩu là bắt buộc' },
              {
                validator: (_, value) => {
                  if (value.length > 0 && value.length < 6) {
                    return Promise.reject(new Error('Mật khẩu mới phải lớn hơn 6 kí tự.'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputPassword placeholder='Nhập mật khẩu' />
          </Form.Item>
          <Form.Item name='dateOfBirth' className='!my-6'>
            <Col className='flex gap-4 justify-between'>
              <Form.Item
                name='ngaySinh'
                className='min-w-[130px]'
                rules={[{ required: true, message: 'Ngày sinh là bắt buộc' }]}
              >
                <Select placeholder='Chọn ngày' options={DaySelects} />
              </Form.Item>
              <Form.Item
                name='thangSinh'
                className='min-w-[130px]'
                rules={[{ required: true, message: 'Tháng là bắt buộc' }]}
              >
                <Select placeholder='Chọn tháng' options={MonthSelects} />
              </Form.Item>
              <Form.Item
                name='namSinh'
                className='min-w-[130px]'
                rules={[{ required: true, message: 'Tháng là bắt buộc' }]}
              >
                <Select placeholder='Chọn năm' options={YearSelects} />
              </Form.Item>
            </Col>
          </Form.Item>
          <Form.Item
            className='!my-6'
            name='gioiTinh'
            rules={[{ required: true, message: 'Giới tính là bắt buộc' }]}
          >
            <Radio.Group>
              <Radio value={0}>Nam</Radio>
              <Radio value={1}>Nữ</Radio>
              <Radio value={2}>Khác</Radio>
            </Radio.Group>
          </Form.Item>

          <div className={clsx(styles.form_controls, styles.form_controls1)}>
            <Button htmlType='submit' className={clsx(styles.form_btn, styles.form_primary)}>
              ĐĂNG KÍ
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

export default FormSignUp;
