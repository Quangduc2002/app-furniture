import { Row } from 'antd';
import ModalCustom from '../../../components/UI/Modal';
import React, { useEffect } from 'react';
import Button from '../../../components/UI/Button/Button';
import { onDelete } from '@/store/Cart/handleCart';
import { useAtom } from 'jotai';
import { atomListCart } from '@/store/type';
import { userDefault } from '@/store/Login/type';
import { ModalIprops } from '@/components/UI/Modal/type';
import Text from '@/components/UI/Text';
import styles from './index.module.scss';

function ModalDelete({ data, children, setVisible, visible }: ModalIprops) {
  const [cartItems, setCartItems] = useAtom(atomListCart);
  const [user] = useAtom(userDefault);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleDeleleCart = (cartItem: any) => {
    onDelete({
      product: cartItem,
      cartItems,
      setCartItems,
      user: user,
    });
    setVisible(false);
  };

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom
        className={styles.modal}
        open={visible}
        onCancel={() => setVisible(false)}
        title='Xóa sản phẩm'
      >
        <Text type='body1'>
          Bạn có chắc chắn muốn xóa sản phẩm{' '}
          <Text
            element='span'
            type='body1'
            className='text-sm not-italic !font-bold leading-[22px]'
          >
            {data?.tenSp}
          </Text>{' '}
          này không?
        </Text>
        <Row wrap={false} align={'middle'} justify={'end'} className='mt-[24px] gap-[16px]'>
          <Button
            type='xhotel-negative-secondary'
            className='w-[96px]'
            onClick={() => setVisible(false)}
          >
            <Text type='title1-semi-bold'>Huỷ</Text>
          </Button>
          <Button
            type='xhotel-negative-primary'
            className='w-[96px]'
            onClick={() => handleDeleleCart(data)}
          >
            <Text type='title1-semi-bold'>Xoá</Text>
          </Button>
        </Row>
      </ModalCustom>
    </>
  );
}

export default ModalDelete;
