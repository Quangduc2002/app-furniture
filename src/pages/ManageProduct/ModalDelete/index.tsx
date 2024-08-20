import { Row } from 'antd';
import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import { ModalIprops } from '@/components/UI/Modal/type';
import Text from '@/components/UI/Text';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { serviceDeleteAllProduct, serviceDeleteProduct } from '../service';
import { toast } from '@/components/UI/Toast/toast';

function index({ data, children, onRefresh, action, disabled }: ModalIprops) {
  const [visible, setVisible] = useState(false);

  const { run: deleteProduct, loading: isLoadingProduct } = useRequest(serviceDeleteProduct, {
    manual: true,
    onSuccess: (res) => {
      toast.success('Xóa sản phẩm thành công !');
      setVisible(false);
      onRefresh && onRefresh();
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  const { run: deleteAllProduct, loading: isLoadingProducts } = useRequest(
    serviceDeleteAllProduct,
    {
      manual: true,
      onSuccess: (res) => {
        toast.success('Xóa sản phẩm thành công !');
        setVisible(false);
        onRefresh && onRefresh();
      },
      onError: (err: any) => {
        toast.error(err);
      },
    },
  );

  const handleDeleteProduct = () => {
    if (action === 'delete' && data.length > 0) {
      deleteAllProduct({
        isChecked: data,
        status: 0,
        action: action,
      });
    } else {
      deleteProduct({
        id: data.ID,
        status: 0,
      });
    }
  };

  return (
    <>
      <span onClick={!disabled ? () => setVisible(true) : () => setVisible(false)}>{children}</span>

      <ModalCustom open={visible} onCancel={() => setVisible(false)}>
        <span className='text-xl'>
          Bạn có chắc chắn muốn xóa sản phẩm{' '}
          <span className='text-xl not-italic font-semibold leading-[22px]'>{data?.tenSp}</span> này
          không?
        </span>
        <Row wrap={false} align={'middle'} justify={'end'} className='mt-[24px] gap-[16px]'>
          <Button
            type='xhotel-negative-secondary'
            className='w-[96px]'
            onClick={() => setVisible(false)}
          >
            <Text type='title1-semi-bold'>Huỷ</Text>
          </Button>
          <Button onClick={handleDeleteProduct} type='xhotel-negative-primary' className='w-[96px]'>
            <Text type='title1-semi-bold'>Xoá</Text>
          </Button>
        </Row>
      </ModalCustom>
    </>
  );
}

export default index;
