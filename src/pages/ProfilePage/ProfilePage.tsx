import clsx from 'clsx';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { Sexs } from '@/utils/Stars';
import { DaySelects, MonthSelects, YearSelects } from '@/utils/FormatDate';
import { useAtom } from 'jotai';
import { userDefault } from '@/store/Login/type';
import { useRequest } from 'ahooks';
import { serviceEditUser, serviceGetUser } from './service';
import { FormatEmail } from '@/utils/FormatEmail';
import { toast } from '@/components/UI/Toast/toast';
import { Icon } from '@/components/UI/IconFont/Icon';
import { Col, Form, Input, Radio, Row, Select } from 'antd';
import { useImageUpload } from '@/utils/FireBase';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import ModalChangePassword from './ModalChangePassword/ModalChangePassword';
import InputText from '@/components/UI/InputText';
import Button from '@/components/UI/Button/Button';
import Text from '@/components/UI/Text';
import { REG_EMAIL } from '@/utils/reg';
import UploadImage from '@/components/UploadImage/UploadImage';
import { getUserAccounts } from '@/store/Login/Login';

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
  const { run: runEditUser } = useRequest(serviceEditUser, {
    manual: true,
    onSuccess: (res) => {
      let roles = res.data.DT.roles;
      let token = res.data.DT.access_token;
      let getUser = res.data.DT.getUser;
      localStorage.setItem('jwt', res.data.DT.access_token);
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
          <h1>Hồ sơ của tôi</h1>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          <ModalChangePassword user={user} visible={visible} setVisible={setVisible}>
            <p className={clsx(styles.container_information__changePass)}>Đổi mật khẩu</p>
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
            {/* <div className={clsx(styles.container_information__bottom__sex, 'w-[580px]')}>
              <label className={clsx(styles.container_information__bottom__label)}>
                Tên đăng nhập
              </label>
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </div> */}
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
              {/* {!changeEmail && (
                <div className='flex justify-between w-full'>
                  <span>{FormatEmail(email)}</span>
                  <p
                    className='hover:text-[#ee4d2d] cursor-pointer'
                    onClick={() => setChangeEmail(true)}
                  >
                    Thay đổi
                  </p>
                </div>
              )} */}
              <InputText disabled={true} placeholder='Nhập email' />
            </Form.Item>

            {/* <div className={clsx(styles.container_information__bottom__sex, 'w-[580px]')}>
              <label className={clsx(styles.container_information__bottom__label)}>Email</label>
              {!changeEmail && (
                <div className='flex justify-between w-full'>
                  <span>{FormatEmail(email)}</span>
                  <p
                    className='hover:text-[#ee4d2d] cursor-pointer'
                    onClick={() => setChangeEmail(true)}
                  >
                    Thay đổi
                  </p>
                </div>
              )}
              {changeEmail && (
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
              )}
            </div> */}

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

            {/* <div className={clsx(styles.container_information__bottom__sex, 'w-[580px]')}>
              <label className={clsx(styles.container_information__bottom__label)}>Giới tính</label>
              <div className='flex items-center'>
                {Sexs.map((sex: any) => {
                  return (
                    <div key={sex.id} style={{ marginRight: 10 }}>
                      <input
                        style={{ marginRight: 4 }}
                        id={sex.id}
                        type='radio'
                        name='gioitinh'
                        value={sex.id}
                        onChange={(e) => setGioiTinh(e.target.value)}
                        checked={sex.id === +gioiTinh ? true : false}
                      />
                      <label htmlFor={sex.id}>{sex.name}</label>
                    </div>
                  );
                })}
              </div>
            </div> */}
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
            {/* <div className={clsx(styles.container_information__bottom__sex, 'w-[580px] ')}>
              <label className={clsx(styles.container_information__bottom__label)}>Ngày sinh</label>

              <div
                className={clsx(styles.auth_froup_date, 'w-full flex justify-between flex-1 gap-4')}
              >
                <select
                  className={clsx(styles.container_information__bottom__select, ' flex-1')}
                  value={Day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option style={{ display: 'none' }}>{curDate.getDay()}</option>

                  {Days.map((day: any) => {
                    return (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    );
                  })}
                </select>
                <select
                  className={clsx(styles.container_information__bottom__select, ' flex-1')}
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
                  className={clsx(styles.container_information__bottom__select, ' flex-1')}
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
            </div> */}

            <div className={clsx(styles.container_information__bottom__sex, 'w-[580px]')}>
              {/* <label className={clsx(styles.container_information__bottom__label)}></label>
              <button
                onClick={handleEdit}
                type='button'
                className={clsx(styles.container_information__bottom__btn)}
              >
                Lưu
              </button> */}
              <Button
                htmlType='submit'
                // disabled={disable}
                // loading={requestAddProduct?.loading || requestEditProduct?.loading || loading}
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
            {/* <div className={clsx(styles.add_formGroup)}>
              <img
                className={clsx(styles.add_formGroup__img, 'object-cover')}
                src={!fileImage ? image : fileImage}
                alt=''
              />
              <Input
                className='hidden'
                type='file'
                name='uploadImage'
                id='FLFrontImage'
                onChange={handleSubmit}
              />
              <br />
              <label
                htmlFor='FLFrontImage'
                className={clsx(styles.add_formGroup__customFile, 'flex items-center gap-2')}
              >
                Chọn ảnh
                <Icon icon='icon-arrow-up-from-bracket' />
              </label>
            </div> */}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ProfilePage;
