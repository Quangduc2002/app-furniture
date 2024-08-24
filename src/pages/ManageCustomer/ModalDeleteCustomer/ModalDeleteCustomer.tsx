import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import { ModalIprops } from '@/components/UI/Modal/type';
import { Row } from 'antd';
import Text from '@/components/UI/Text';
import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { toast } from '@/components/UI/Toast/toast';
import { serviceDeleteClient } from '../service';

function ModalDeleteCustomer({ data, children, onRefresh }: ModalIprops) {
  const [visible, setVisible] = useState(false);
  const { run, loading } = useRequest(serviceDeleteClient, {
    manual: true,
    onSuccess: (res) => {
      setVisible(false);
      onRefresh && onRefresh();

      toast.success(res?.data?.message);
    },
    onError(err: any) {
      toast.error(err);
    },
  });

  const onDelete = () => {
    if (data?.status) {
      run(data.ID, 0);
    } else {
      run(data.ID, 1);
    }
  };

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom
        open={visible}
        onCancel={() => setVisible(false)}
        title={'Trạng thái tài khoản của khách hàng'}
      >
        <Text type='body2' color='text-primary' className='mt-4'>
          {data?.status ? 'Bạn có muốn khóa tài khoản' : 'Bạn có muốn mở khóa tài khoản'}&nbsp;
          <span className='text-lg not-italic font-semibold leading-[22px]'>{data?.name}</span>
          &nbsp; không?
        </Text>
        <Row wrap={false} align={'middle'} justify={'end'} className='mt-[24px] gap-[16px]'>
          <Button
            type='xhotel-negative-secondary'
            className='w-[96px] h-[36px] !p-0'
            onClick={() => setVisible(false)}
          >
            <Text type='title1-semi-bold'>Huỷ</Text>
          </Button>
          <Button
            type='xhotel-negative-primary'
            className='w-[96px] h-[36px] !p-0'
            disabled={loading}
            loading={loading}
            onClick={onDelete}
          >
            <Text type='title1-semi-bold'>{data?.status ? 'Khóa' : 'Mở khóa'}</Text>
          </Button>
        </Row>
      </ModalCustom>
    </>
  );
}

export default ModalDeleteCustomer;
