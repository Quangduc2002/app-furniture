/* eslint-disable react-hooks/exhaustive-deps */
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
const style: any = { layout: 'vertical' };

interface ButtonWrapperProps {
  showSpinner: any;
  amount: any;
  handleOrder: any;
  currency: any;
}

interface PayPalProps {
  handleOrder: (e: any) => void;
  amount: any;
}

const ButtonWrapper = ({ showSpinner, amount, handleOrder, currency }: ButtonWrapperProps) => {
  const [{ isPending }] = usePayPalScriptReducer();

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
            return handleOrder();
          })
        }
      />
    </>
  );
};

export default function PayPal({ handleOrder, amount }: PayPalProps) {
  return (
    <div style={{ maxWidth: '750px', minHeight: '200px' }}>
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
