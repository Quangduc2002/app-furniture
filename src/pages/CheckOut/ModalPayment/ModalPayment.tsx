import PayPal from '@/components/Paypal/Paypal';
import ModalCustom from '@/components/UI/Modal';
import Text from '@/components/UI/Text';
import React, { useState } from 'react';
interface IModalPayment {
  handleOrder: (orderInfo: any) => void;
  children?: React.ReactNode;
  amount?: any;
}
function ModalPayment({ handleOrder, children, amount }: IModalPayment) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>
      <ModalCustom open={visible} onCancel={() => setVisible(false)}>
        <Text type='heading4-semi-bold'>Thanh Toán bằng thẻ paypal</Text>
        <PayPal handleOrder={handleOrder} amount={amount} />
      </ModalCustom>
    </>
  );
}

export default ModalPayment;
