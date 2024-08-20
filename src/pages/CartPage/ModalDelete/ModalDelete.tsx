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

      <ModalCustom open={visible} onCancel={() => setVisible(false)}>
        <span>
          Bạn có chắc chắn muốn xóa sản phẩm{' '}
          <span className='text-sm not-italic font-semibold leading-[22px]'>{data?.tenSp}</span> này
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
