import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import { ModalIprops } from '@/components/UI/Modal/type';
import { Row } from 'antd';
import clsx from 'clsx';
import Text from '@/components/UI/Text';
import { useRequest } from 'ahooks';
import { stars } from '@/utils/Stars';
import styles from '../index.module.scss';
import { serviceSeeEvaluate } from '../service';

interface ModalSussesRatingsProps {
  ratings: any;
}

function ModalSussesRatings({
  data,
  setVisible,
  visible,
  ratings,
}: ModalIprops & ModalSussesRatingsProps) {
  const { data: orderDetails } = useRequest(() => serviceSeeEvaluate(data));

  return (
    <ModalCustom open={visible} onCancel={() => setVisible(false)} title={'Đánh giá của bạn'}>
      <div className={clsx(styles.table)}>
        {orderDetails?.data?.map((orderDetails: any) => {
          return (
            <div key={orderDetails.ID} className={clsx(styles.table__evaluate)}>
              <div className={clsx(styles.table__sp)}>
                <img
                  className={clsx(styles.table_image)}
                  src={`/Images/${orderDetails.image}`}
                  alt=''
                />
                <p style={{ fontSize: 20 }}>{orderDetails.tenSp}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <div className={clsx(styles.table__quality)}>
                  <p className='min-w-[160px]'>Chất lượng sản phẩm:</p>
                  <div className={clsx(styles.right_formstar)}>
                    <div className={clsx(styles.describe_star)}>
                      {stars.map((star) => {
                        return (
                          <div
                            key={star.id}
                            className={clsx(
                              `${star.class}`,

                              ratings?.data.map((rating: any) => {
                                return orderDetails.productID === rating.productId
                                  ? rating.numberRating === star.id
                                    ? 'active'
                                    : 'hidden'
                                  : '';
                              }),
                            )}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className={clsx(styles.table__quality)}>
                  {ratings?.data.map((rating: any) => {
                    return (
                      orderDetails.productID === rating.productId &&
                      orderDetails.orderID === rating.orderId &&
                      (rating.comment ? (
                        <>
                          <p className='min-w-[160px]'>Nhận xét sản phẩm:</p>
                          <p>{rating.comment}</p>
                        </>
                      ) : (
                        ''
                      ))
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Row wrap={false} align={'middle'} justify={'end'} className='mt-[24px] gap-[16px]'>
        <Button
          type='xhotel-negative-secondary'
          className='w-[96px]'
          onClick={() => setVisible(false)}
        >
          <Text type='title1-semi-bold'>OK</Text>
        </Button>
      </Row>
    </ModalCustom>
  );
}

export default ModalSussesRatings;
