import clsx from 'clsx';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { Sexs } from '@/utils/Stars';
import { curDate, Days, Months, Years } from '@/utils/FormatDate';
import { useAtom } from 'jotai';
import { userDefault } from '@/store/Login/type';
import { useRequest } from 'ahooks';
import { serviceEditUser, serviceGetUser } from './service';
import { FormatEmail } from '@/utils/FormatEmail';
import { toast } from '@/components/UI/Toast/toast';
import { Icon } from '@/components/UI/IconFont/Icon';
import { Input } from 'antd';
import { useImageUpload } from '@/utils/FireBase';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import ModalChangePassword from './ModalChangePassword/ModalChangePassword';

function ProfilePage() {
  const [user] = useAtom(userDefault);
  const { uploadImage } = useImageUpload();
  const navigate = useNavigate();
  const [Day, setDay] = useState('');
  const [Month, setMonth] = useState('');
  const [Year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [fileImage, setFileImage] = useState<string | null>(null);
  const [changeEmail, setChangeEmail] = useState(false);
  const [visible, setVisible] = useState(false);
  useRequest(() => serviceGetUser(user?.account?.getUser?.id), {
    onSuccess: (res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      setGioiTinh(res.data.gioiTinh);
      setDay(res.data.ngaySinh);
      setMonth(res.data.thangSinh);
      setYear(res.data.namSinh);
      setImage(res.data.image);
    },
  });

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate(ROUTE_PATH.LOGIN);
    }
  }, [navigate, user]);
  const { run: runEditUser } = useRequest(serviceEditUser, {
    manual: true,
    onSuccess: (res) => {
      toast.success('Cập nhật thông tin thành công');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (item: any) => {
    const file = item.target.files[0] || null;
    setFile(file);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFileImage(fileUrl);
    } else {
      setFileImage(null);
    }
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    let dataImage = null;
    if (file) {
      dataImage = await uploadImage(file);
    }

    runEditUser(user?.account?.getUser?.id, {
      image: dataImage,
      email: email,
      name: name,
      ngaySinh: Day,
      thangSinh: Month,
      namSinh: Year,
      gioiTinh: gioiTinh,
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

        <div className={clsx(styles.container_information__bottom)}>
          <div className={clsx(styles.container_information__bottom__left)}>
            <div className={clsx(styles.container_information__bottom__sex, 'w-[580px]')}>
              <label className={clsx(styles.container_information__bottom__label)}>
                Tên đăng nhập
              </label>
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className={clsx(styles.container_information__bottom__sex, 'w-[580px]')}>
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
            </div>

            <div className={clsx(styles.container_information__bottom__sex, 'w-[580px]')}>
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
            </div>

            <div className={clsx(styles.container_information__bottom__sex, 'w-[580px] ')}>
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
            </div>

            <div className={clsx(styles.container_information__bottom__sex, 'w-[580px]')}>
              <label className={clsx(styles.container_information__bottom__label)}></label>
              <button
                onClick={handleEdit}
                type='button'
                className={clsx(styles.container_information__bottom__btn)}
              >
                Lưu
              </button>
            </div>
          </div>

          <div className={clsx(styles.add_right)}>
            <div className={clsx(styles.add_formGroup)}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
