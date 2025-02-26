import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import { ModalIprops } from '@/components/UI/Modal/type';
import { Form, Row } from 'antd';
import Text from '@/components/UI/Text';
import { useEffect, useState } from 'react';
import InputText from '@/components/UI/InputText';
import { useRequest } from 'ahooks';
import { serviceAddMaterial, serviceUpdateMaterial } from '../service';
import { toast } from '@/components/UI/Toast/toast';

function ModalMaterial({ data, children, onRefresh }: ModalIprops) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { run: runAddMaterial, loading: loadingAddMaterial } = useRequest(serviceAddMaterial, {
    manual: true,
    onSuccess: () => {
      setVisible(false);
      onRefresh && onRefresh();
      form.resetFields();
      toast.success('Thêm chất liệu thành công');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const { run: runUpdateMaterial, loading: loadingUpdateMaterial } = useRequest(
    serviceUpdateMaterial,
    {
      manual: true,
      onSuccess: () => {
        setVisible(false);
        onRefresh && onRefresh();
        toast.success('Sửa chất liệu thành công');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    },
  );

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        tenChatLieu: data?.tenChatLieu,
      });
    }
  }, [visible]);

  const onFinish = async (values: any) => {
    if (data?.id) {
      runUpdateMaterial(data.id, {
        tenChatLieu: values?.tenChatLieu,
      });
      return;
    }
    runAddMaterial({ tenChatLieu: values?.tenChatLieu });
  };

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom
        open={visible}
        onCancel={() => setVisible(false)}
        title={data ? 'Sửa chất liệu' : 'Thêm mới chất liệu'}
      >
        <Form layout='vertical' onFinish={onFinish} form={form}>
          <div className='my-[16px]'>
            <Form.Item
              name={'tenChatLieu'}
              label='Tên chất liệu'
              rules={[{ whitespace: true, required: true, message: 'Tên chất liệu là bắt buộc' }]}
            >
              <InputText placeholder='Nhập nội dung' />
            </Form.Item>
          </div>

          <Form.Item noStyle dependencies={['tenChatLieu']}>
            {({ getFieldsValue }) => {
              const { tenChatLieu } = getFieldsValue();
              const disabled = !tenChatLieu || !tenChatLieu.trim();

              return (
                <Row wrap={false} align={'middle'} justify={'end'} className='mt-[48px] gap-[16px]'>
                  <Button
                    htmlType='button'
                    type='xhotel-secondary'
                    className='w-[144px] h-[44px]'
                    onClick={() => setVisible(false)}
                  >
                    <Text type='title1-semi-bold'>Huỷ</Text>
                  </Button>
                  <Button
                    htmlType='submit'
                    type='xhotel-negative-primary'
                    className='w-[144px] h-[44px]'
                    disabled={disabled}
                    loading={loadingAddMaterial || loadingUpdateMaterial}
                  >
                    <Text type='title1-semi-bold'>Xác nhận</Text>
                  </Button>
                </Row>
              );
            }}
          </Form.Item>
        </Form>
      </ModalCustom>
    </>
  );
}

export default ModalMaterial;
