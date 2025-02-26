/* eslint-disable react-hooks/exhaustive-deps */
import { atomOrderInfo } from '@/store/type';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useAtom } from 'jotai';
const style: any = { layout: 'vertical' };

interface ButtonWrapperProps {
  showSpinner: any;
  amount: any;
  handleOrder: any;
  currency: any;
  orderInfo?: any;
}

interface PayPalProps {
  handleOrder: (e: any) => void;
  amount: any;
}

const ButtonWrapper = ({ showSpinner, amount, handleOrder, currency }: ButtonWrapperProps) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [orderInfo] = useAtom(atomOrderInfo);

  return (
    <>
      {showSpinner && isPending && <div className='spinner' />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, amount]}
        fundingSource={undefined}
        createOrder={(data, actions: any) =>
          actions.order
            .create({
              purchase_units: [{ amount: { currency_code: currency, value: amount } }],
            })
            .then((orderId: any) => orderId)
        }
        onApprove={(data, actions: any) =>
          actions?.order?.capture().then(async (res: any) => {
            return handleOrder(orderInfo);
          })
        }
      />
    </>
  );
};

export default function PayPal({ handleOrder, amount }: PayPalProps) {
  return (
    <div className='max-w-[750px] min-h-[200px] mt-8'>
      <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
        <ButtonWrapper
          showSpinner={false}
          handleOrder={handleOrder}
          currency={'USD'}
          amount={amount}
        />
      </PayPalScriptProvider>
    </div>
  );
}
