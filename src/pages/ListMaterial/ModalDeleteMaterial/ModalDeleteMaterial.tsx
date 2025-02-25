import ModalCustom from '@/components/UI/Modal';
import { ModalIprops } from '@/components/UI/Modal/type';
import React, { useState } from 'react';
import Text from '@/components/UI/Text';
import { Row } from 'antd';
import Button from '@/components/UI/Button/Button';
import { useRequest } from 'ahooks';
import { serviceDeleteMaterial } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import styles from './index.module.scss';

function ModalDeleteMaterial({ data, children, onRefresh }: ModalIprops) {
  const [visible, setVisible] = useState(false);
  const { run, loading } = useRequest(serviceDeleteMaterial, {
    manual: true,
    onSuccess: () => {
      setVisible(false);
      onRefresh && onRefresh();
      toast.success('Xóa dịch vụ thành công');
    },
    onError(err: any) {
      toast.error(err);
    },
  });

  const onDelete = () => {
    run(data.id);
  };

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom
        open={visible}
        onCancel={() => setVisible(false)}
        title={'Xóa chất liệu'}
        className={styles.modal}
      >
        <Text type='body2' color='text-primary' className='mt-4'>
          Bạn có chắc chắn muốn xóa chất liệu{' '}
          <span className='text-sm not-italic font-semibold leading-[22px]'>{data?.name}</span> này
          không?
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
            <Text type='title1-semi-bold'>Xoá</Text>
          </Button>
        </Row>
      </ModalCustom>
    </>
  );
}

export default ModalDeleteMaterial;
