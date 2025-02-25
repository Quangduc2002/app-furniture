import { Row } from 'antd';
import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import { ModalIprops } from '@/components/UI/Modal/type';
import Text from '@/components/UI/Text';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { toast } from '@/components/UI/Toast/toast';
import { serviceTrash } from '../service';
import { DeleteFileImage } from '@/utils/FireBase';
import styles from './index.module.scss';

function ModalTrash({ data, children, onRefresh, action, disabled }: ModalIprops) {
  const [visible, setVisible] = useState(false);

  const isCheck = data?.map((item: any) => item.ID);
  const { run } = useRequest(serviceTrash, {
    manual: true,
    onSuccess: async (res) => {
      if (action === 'delete') {
        toast.success('Xóa sản phẩm thành công !');
        const deleteListImage = data?.map((item: any) => {
          DeleteFileImage(item?.image);
        });

        await Promise.all(deleteListImage);
      } else {
        toast.success('Khôi phục sản phẩm thành công !');
      }

      setVisible(false);
      onRefresh && onRefresh();
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  const handleDeleteProduct = () => {
    run({
      isChecked: isCheck,
      status: 1,
      action: action,
    });
  };

  return (
    <>
      <span onClick={!disabled ? () => setVisible(true) : () => setVisible(false)}>{children}</span>

      <ModalCustom
        open={visible}
        onCancel={() => setVisible(false)}
        title={action !== 'restore' ? 'Xóa sản phẩm' : 'Khôi phục sản phẩm'}
        className={styles.modal}
      >
        <Text type='body1' className='text-xl'>
          {action !== 'restore'
            ? 'Bạn có chắc chắn muốn xóa sản phẩm này không ?'
            : 'Bạn có muốn khôi phục không ?'}
        </Text>
        <Row wrap={false} align={'middle'} justify={'end'} className='mt-[24px] gap-[16px]'>
          <Button
            className='w-[96px]'
            type={action !== 'restore' ? 'xhotel-negative-secondary' : 'xhotel-secondary'}
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
