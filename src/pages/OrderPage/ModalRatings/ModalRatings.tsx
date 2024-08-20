import ModalCustom from '@/components/UI/Modal';
import { ModalIprops } from '@/components/UI/Modal/type';
import clsx from 'clsx';
import styles from '../index.module.scss';
import { Row } from 'antd';
import Button from '@/components/UI/Button/Button';
import Text from '@/components/UI/Text';
import { useRequest } from 'ahooks';
import { serviceSeeEvaluate, serviceSubmitEvaluate } from '../service';
import { stars } from '@/utils/Stars';
import { useState } from 'react';
import { toast } from '@/components/UI/Toast/toast';

interface ModalRatingsProps {
  onRefresh: () => void;
}

function ModalRatings({
  data,
  setVisible,
  visible,
  user,
  onRefresh,
}: ModalIprops & ModalRatingsProps) {
  const [checkStar, setCheckStar] = useState<any>([]);
  const { data: orderDetails } = useRequest(() => serviceSeeEvaluate(data));
  const [comments, setComments] = useState<any>([]);
  const [valueStar, setValueStar] = useState<any>([]);
  const handleStar = ({ numberRating, order, orderID, productID, comment }: any) => {
    setCheckStar([...checkStar, { numberRating, order, orderID, productID, comment }]);
    if (checkStar.length !== 0) {
      for (let i = 0; i < checkStar.length; i++) {
        if (checkStar[i].order === order) {
          setCheckStar([
            ...checkStar.filter((check: any) => check.order !== order),
            { numberRating, order, orderID, productID, comment },
          ]);
        }
      }
    }
  };

  const { run } = useRequest(serviceSubmitEvaluate, {
    manual: true,
    onSuccess: (res) => {
      setVisible(false);
      onRefresh && onRefresh();
      toast.success('Bạn đã đánh giá thành công !');
    },
  });

  const handleSubmitEvaluate = () => {
    if (!checkStar?.some((item: any) => !item?.numberRating && checkStar)) {
      run(user?.account?.getUser?.id, checkStar);
    } else {
      toast.error('Vui lòng đánh giá sao !');
    }
  };

  return (
    <ModalCustom open={visible} onCancel={() => setVisible(false)} title={'Đánh giá sản phẩm'}>
      <div className={clsx(styles.table)}>
        {orderDetails?.data.map((orderDetail: any) => {
          return (
            <div key={orderDetail.ID} className={clsx(styles.table__evaluate)}>
              <div className={clsx(styles.table__sp)}>
                <img
                  className={clsx(styles.table_image, 'rounded-md')}
                  src={`/Images/${orderDetail.image}`}
                  alt=''
                />
                <div className='flex flex-col gap-2'>
                  <p className='text-[18px]'>{orderDetail.tenSp}</p>
                  <p className='text-[18px]'>Kích thước: {orderDetail.kichThuoc}</p>
                </div>
              </div>
              <div className={clsx(styles.table__quality)}>
                <p>Chất lượng sản phẩm:</p>
                <form className={clsx(styles.right_formstar)}>
                  <div className={clsx(styles.describe_star)}>
                    {stars.map((star) => {
                      return (
                        <div
                          key={star.id}
                          className={clsx(
                            styles.describe__star,
                            `${star.class}`,
                            'star',
                            checkStar.map((checked: any) => {
                              return orderDetail.ID === checked.order
                                ? checked.numberRating === star.id
                                  ? 'active'
                                  : ' '
                                : '';
                            }),
                          )}
                          onClick={() => {
                            return (
                              handleStar({
                                numberRating: star.id,
                                order: orderDetail.ID,
                                orderID: orderDetail.orderID,
                                productID: orderDetail.productID,
                                comment: comments[`comment-${orderDetail.ID}`],
                              }),
                              setValueStar((prevStar: any) => ({
                                ...prevStar,
                                [`star-${orderDetail.ID}`]: star.id,
                              }))
                            );
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </form>
              </div>
              <textarea
                placeholder='Để lại đánh giá'
                className={clsx(styles.table__comment)}
                cols={100}
                value={comments[`comment-${orderDetail.ID}`] || ''}
                onChange={(e) =>
                  setComments((prevComments: any) => ({
                    ...prevComments,
                    [`comment-${orderDetail.ID}`]: e.target.value,
                  }))
                }
                onBlur={() =>
                  handleStar({
                    numberRating: valueStar[`star-${orderDetail.ID}`],
                    order: orderDetail.ID,
                    orderID: orderDetail.orderID,
                    productID: orderDetail.productID,
                    comment: comments[`comment-${orderDetail.ID}`],
                  })
                }
              />
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
          <Text type='title1-semi-bold'>Huỷ</Text>
        </Button>
        <Button onClick={handleSubmitEvaluate} type='xhotel-negative-primary' className='w-[96px]'>
          <Text type='title1-semi-bold'>Đánh giá</Text>
        </Button>
      </Row>
    </ModalCustom>
  );
}

export default ModalRatings;
