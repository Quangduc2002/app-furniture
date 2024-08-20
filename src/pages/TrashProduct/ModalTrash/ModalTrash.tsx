import { Row } from 'antd';
import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import { ModalIprops } from '@/components/UI/Modal/type';
import Text from '@/components/UI/Text';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { toast } from '@/components/UI/Toast/toast';
import { serviceTrash } from '../service';

function ModalTrash({ data, children, onRefresh, action, disabled }: ModalIprops) {
  const [visible, setVisible] = useState(false);

  const { run } = useRequest(serviceTrash, {
    manual: true,
    onSuccess: (res) => {
      action === 'delete'
        ? toast.success('Xóa sản phẩm thành công !')
        : toast.success('Khôi phục sản phẩm thành công !');
      setVisible(false);
      onRefresh && onRefresh();
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  const handleDeleteProduct = () => {
    run({
      isChecked: data,
      status: 1,
      action: action,
    });
  };

  return (
    <>
      <span onClick={!disabled ? () => setVisible(true) : () => setVisible(false)}>{children}</span>

      <ModalCustom open={visible} onCancel={() => setVisible(false)}>
        <span className='text-xl'>
          {action !== 'restore'
            ? 'Bạn có chắc chắn muốn xóa sản phẩm này không ?'
            : 'Bạn có muốn khôi phục không ?'}
        </span>
        <Row wrap={false} align={'middle'} justify={'end'} className='mt-[24px] gap-[16px]'>
          <Button
            type='xhotel-negative-secondary'
            className='w-[96px]'
            onClick={() => setVisible(false)}
          >
            <Text type='title1-semi-bold'>Huỷ</Text>
          </Button>
          <Button
            onClick={handleDeleteProduct}
            type={action !== 'restore' ? 'xhotel-negative-primary' : 'xhotel-primary'}
            className='min-w-[96px]'
          >
            <Text type='title1-semi-bold'>{action !== 'restore' ? 'Xóa' : 'Khôi phục'}</Text>
          </Button>
        </Row>
      </ModalCustom>
    </>
  );
}

export default ModalTrash;
