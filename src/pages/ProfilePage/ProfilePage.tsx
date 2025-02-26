import clsx from 'clsx';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { DaySelects, MonthSelects, YearSelects } from '@/utils/FormatDate';
import { useAtom } from 'jotai';
import { userDefault } from '@/store/Login/type';
import { useRequest } from 'ahooks';
import { serviceEditUser } from './service';
import { toast } from '@/components/UI/Toast/toast';
import { Col, Form, Radio, Row, Select } from 'antd';
import { useImageUpload } from '@/utils/FireBase';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import ModalChangePassword from './ModalChangePassword/ModalChangePassword';
import InputText from '@/components/UI/InputText';
import Button from '@/components/UI/Button/Button';
import Text from '@/components/UI/Text';
import { REG_EMAIL } from '@/utils/reg';
import UploadImage from '@/components/UploadImage/UploadImage';

function ProfilePage() {
  const [user] = useAtom(userDefault);
  const [, setUser] = useAtom(userDefault);
  const [form] = Form.useForm();
  const { uploadImage } = useImageUpload();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (user?.isAuthenticated) {
      form.setFieldsValue({
        name: user?.account?.getUser.name,
        gioiTinh: user?.account?.getUser.gioiTinh,
        ngaySinh: user?.account?.getUser.ngaySinh,
        thangSinh: user?.account?.getUser.thangSinh,
        namSinh: user?.account?.getUser.namSinh,
        email: user?.account?.getUser.email,
        image: user?.account?.getUser.image,
      });
    }
  }, [user?.isAuthenticated]);

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate(ROUTE_PATH.LOGIN);
    }
  }, [navigate, user]);

  const { run: runEditUser, loading } = useRequest(serviceEditUser, {
    manual: true,
    onSuccess: (res) => {
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
      toast.success('Cập nhật thông tin thành công');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = async (values: any) => {
    const file = values.image.file;
    let dataImage = null;

    if (file) {
      dataImage = await uploadImage(file);
    }

    runEditUser(user?.account?.getUser?.id, {
      image: dataImage ? dataImage : values.image,
      email: values.email,
      name: values.name,
      ngaySinh: values.ngaySinh,
      thangSinh: values.thangSinh,
      namSinh: values.namSinh,
      gioiTinh: values.gioiTinh,
    });
  };
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.container_information)}>
        <div className={clsx(styles.container_information__top, 'flex flex-col gap-2')}>
          <h1 className='text-2xl font-bold'>Hồ sơ của tôi</h1>
          <p className='text-lg'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          <ModalChangePassword user={user} visible={visible} setVisible={setVisible}>
            <p className={clsx(styles.container_information__changePass, 'w-max text-lg')}>
              Đổi mật khẩu
            </p>
          </ModalChangePassword>
        </div>

        <Form
          layout='vertical'
          onFinish={onSubmit}
          form={form}
          className={clsx(styles.container_information__bottom)}
        >
          <Col className={clsx(styles.container_information__bottom__left, 'flex flex-col gap-4')}>
            <Form.Item
              className='w-[580px]'
              name='name'
              label='Tên đăng nhập:'
              rules={[{ required: true, message: 'Tên đăng nhập là bắt buộc' }]}
            >
              <InputText placeholder='Nhập tên đăng nhập' />
            </Form.Item>
            <Form.Item
              className='w-[580px]'
              name='email'
              label='Email:'
              rules={[
                {
                  required: true,
                  message: 'Email là bắt buộc',
                },
                {
                  pattern: REG_EMAIL,
                  message: 'Email không hợp lệ',
                },
              ]}
            >
              <InputText disabled={true} placeholder='Nhập email' />
            </Form.Item>

            <Form.Item
              className='w-[580px]'
              name='gioiTinh'
              label='Giới tính:'
              rules={[{ required: true, message: 'Giới tính là bắt buộc' }]}
            >
              <Radio.Group>
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
                <Radio value={2}>Khác</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item className='w-[580px]' name='dateOfBirth' label='Ngày sinh:'>
              <Col className='flex gap-4 justify-between'>
                <Form.Item name='ngaySinh' className='w-full'>
                  <Select placeholder='Chọn ngày' options={DaySelects} />
                </Form.Item>
                <Form.Item name='thangSinh' className='w-full'>
                  <Select placeholder='Chọn tháng' options={MonthSelects} />
                </Form.Item>
                <Form.Item name='namSinh' className='w-full'>
                  <Select placeholder='Chọn năm' options={YearSelects} />
                </Form.Item>
              </Col>
            </Form.Item>
            <div className={clsx(styles.container_information__bottom__sex, 'w-[580px]')}>
              <Button
                htmlType='submit'
                loading={loading}
                className='w-[100px] !py-3'
                type='xhome-negative-primary'
              >
                <Text element='span'>Xác nhận</Text>
              </Button>
            </div>
          </Col>

          <div className={clsx(styles.add_right)}>
            <Form.Item name='image' rules={[{ required: true, message: 'Ảnh là bắt buộc' }]}>
              <UploadImage
                type='profile'
                description='(kích cỡ tối ưu, 794x540px)'
                width={397}
                height={270}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ProfilePage;
