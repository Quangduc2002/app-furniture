import ModalCustom from '@/components/UI/Modal';
import clsx from 'clsx';
import { ModalIprops } from '@/components/UI/Modal/type';
import styles from '../index.module.scss';
import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { serviceChangePassword } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import { Form, Input } from 'antd';
import InputPassword from '@/components/UI/InputPassword';
import Button from '@/components/UI/Button/Button';
import Text from '@/components/UI/Text';
import { REG_SPACE } from '@/utils/reg';

function ModalChangePassword({ children, setVisible, visible, user }: ModalIprops) {
  const [form] = Form.useForm();
  const allValues = Form.useWatch([], form);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setDisabled(false);
      },
      (error) => {
        if (error?.errorFields?.length > 0) {
          setDisabled(true);
        }
      },
    );
  }, [allValues]);

  const { run: changePassword, loading } = useRequest(serviceChangePassword, {
    manual: true,
    onSuccess: (res) => {
      toast.success('Đổi mật khẩu thành công ');
      setVisible(false);
      form.resetFields();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onFinish = (value: any) => {
    changePassword(user?.account?.getUser?.id, {
      currentPass: value.currentPassword,
      password: value.newPassword,
    });
  };

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom open={visible} onCancel={() => setVisible(false)}>
        <div>
          <div className='flex flex-col gap-2 mb-6'>
            <h3 className='text-2xl font-bold'>Đổi mật khẩu</h3>
            <p>Mật khẩu của bạn phải có ít nhất 6 ký tự</p>
          </div>

          <Form
            layout='vertical'
            onFinish={onFinish}
            form={form}
            className={clsx('flex flex-col gap-4')}
          >
            <Form.Item
              name='currentPassword'
              rules={[
                { required: true, message: 'Mật khẩu hiện tại là bắt buộc' },
                {
                  validator: (_, value) => {
                    if (value.length > 0 && value.length < 6) {
                      return Promise.reject(new Error('Mật khẩu phải lớn hơn 6 kí tự.'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputPassword placeholder='Nhập mật khẩu hiện tại' />
            </Form.Item>
            <Form.Item
              name='newPassword'
              rules={[
                { required: true, message: 'Mật khẩu mới là bắt buộc' },
                {
                  pattern: REG_SPACE,
                  message: 'Mật khẩu không được chứa khoảng trắng.',
                },
                ({ getFieldValue }) => ({
                  validator: (_, value) => {
                    if (value.length > 0 && value.length < 6) {
                      return Promise.reject(new Error('Mật khẩu mới phải lớn hơn 6 kí tự.'));
                    } else if (!getFieldValue('currentPassword') === value) {
                      return Promise.reject(new Error('Mật khẩu mới phải khác mật khẩu hiện tại.'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputPassword placeholder='Nhập mật khẩu mới' />
            </Form.Item>
            <Form.Item
              name='confirmPassword'
              rules={[
                { required: true, message: 'Nhập lại mật khẩu mới là bắt buộc' },
                {
                  pattern: REG_SPACE,
                  message: 'Mật khẩu không được chứa khoảng trắng.',
                },
                ({ getFieldValue }) => ({
                  validator: (_, value) => {
                    if (value.length > 0 && getFieldValue('newPassword') !== value) {
                      return Promise.reject(new Error('Mật khẩu mới không khớp.'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputPassword placeholder='Nhập lại mật khẩu mới' />
            </Form.Item>
            <Button
              htmlType='submit'
              loading={loading}
              disabled={disabled || (allValues && Object.entries(allValues).length === 0)}
              className='w-full !py-3'
              type='xhome-negative-primary'
            >
              <Text element='span'> Đổi mật khẩu</Text>
            </Button>
          </Form>
        </div>
      </ModalCustom>
    </>
  );
}

export default ModalChangePassword;
