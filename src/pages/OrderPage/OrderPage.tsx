import { Tabs } from 'antd';
import clsx from 'clsx';
import styles from './index.module.scss';
import { motion, spring } from 'framer-motion';
import { useRequest } from 'ahooks';
import { serviceGetAllOrder, serviceGetRatings, serviceSeeEvaluate } from './service';
import { userDefault } from '@/store/Login/type';
import { useAtom } from 'jotai';
import { FormatPrice } from '@/utils/FormatPrice';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/UI/IconFont/Icon';
import { useEffect, useState } from 'react';
import ModalRatings from './ModalRatings/ModalRatings';
import ModalSussesRatings from './ModalRatings/ModalSuccessRatings';

function OrderPage() {
  const [user] = useAtom(userDefault);
  const [orderId, setOrderId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [status, setStatus] = useState('');

  const items = [
    { label: 'Tất cả', key: 'getOrder' },
    { label: 'Chờ xác nhận', key: 'waitConfirm' },
    { label: 'Hoàn thành', key: 'finish' },
    { label: 'Đã hủy', key: 'cancel' },
  ];

  useEffect(() => {
    setStatus(items[0]?.key);
  }, []);

  useEffect(() => {
    if (status) {
      runAllOrder();
    }
  }, [status]);

  const { data: orders, run: runAllOrder } = useRequest(
    () => serviceGetAllOrder(user?.account.getUser.id, status),
    { manual: true },
  );

  const { data: ratings, refresh } = useRequest(() => serviceGetRatings(user?.account.getUser.id));
  const hanldeEvaluate = async (id: any) => {
    setVisible(true);
    setOrderId(id);
  };

  const hanldeSeeEvaluate = async (id: any) => {
    setVisible1(true);
    setOrderId(id);
  };

  return (
    <div className='max-w-[1200px] m-auto my-[20px]'>
      <Tabs items={items} onChange={(e) => setStatus(e)} />
      <motion.div
        className={clsx(styles.order)}
        initial={{ y: '4rem', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          type: spring,
        }}
      >
        {orders?.data.length === 0 ? (
          <div className={clsx(styles.order_ImageOrder)}>
            <div style={{ textAlign: 'center' }}>
              <img alt='' src='/Images/hoaDon.png' />
              <p>Chưa có đơn hàng</p>
            </div>
          </div>
        ) : (
          orders?.data.map((order: any) => {
            let totalOrder = 0;
            for (let i = 0; i < order.length; i++) {
              totalOrder += order[i].donGia;
            }

            return (
              <div
                key={order[0]?.ID}
                className={clsx(styles.order_container, 'border border-[#00000017] rounded-lg')}
              >
                <div style={{ padding: 24, marginBottom: 10 }}>
                  <div className={clsx(styles.order_header, 'h-12')}>
                    <div className={clsx(styles.order_header__left)}>
                      <p className={clsx(styles.order_header__left__favourite)}>Yêu thích</p>
                      <p className={clsx(styles.order_header__left__shop)}>QuangDucShop</p>
                    </div>
                    <div className={clsx(styles.order_status)}>
                      {order[0].Order.trangThaiDH === 0 ? (
                        <p className={clsx(styles.order_status__waitConfirm)}>Chờ xác nhận</p>
                      ) : order[0].Order.trangThaiDH === 3 ? (
                        <p className={clsx(styles.order_status__waitConfirm)}>Đã hủy</p>
                      ) : (
                        <div className={clsx(styles.order_header__right)}>
                          <div className={clsx(styles.order_status)}>
                            <img
                              className={clsx(styles.order_status__img)}
                              alt=''
                              src='/Images/free.png'
                            />
                            <p className={clsx(styles.order_header__right__p)}>
                              Giao hàng thành công
                            </p>
                          </div>
                          {order.every((obj1: any) =>
                            ratings?.data?.some((obj2: any) => obj1.productID === obj2.productId),
                          ) ? (
                            <p
                              className={clsx(
                                styles.order_header__right__review,
                                '!cursor-default text-lg',
                              )}
                            >
                              Đã đánh giá
                            </p>
                          ) : (
                            <p
                              onClick={() => hanldeEvaluate(order[0].orderID)}
                              className={clsx(styles.order_header__right__review)}
                            >
                              Đánh giá
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={clsx(styles.order_body)}>
                    {order.map((item: any) => {
                      return (
                        <div key={item.ID} className={clsx(styles.order_product)}>
                          <div className={clsx(styles.order_product__left)}>
                            <img
                              className={clsx(styles.order_product__img)}
                              alt=''
                              src={`${
                                item?.image?.match(/^https:/) ? item.image : `/Images/${item.image}`
                              }`}
                            />
                            <div>
                              <p className={clsx(styles.order_product__name)}>{item.tenSp}</p>
                              <p className={clsx(styles.order_product__numberOf)}>
                                Kích thước: {item.kichThuoc}
                              </p>
                              <p className={clsx(styles.order_product__numberOf)}>
                                Số lượng: x{item.soLuong}
                              </p>
                            </div>
                          </div>
                          <div className={clsx(styles.order_product__right)}>
                            <span
                              className={clsx(styles.order_product__right__discount, 'text-[16px]')}
                            >
                              {FormatPrice.format(item.giaBan)} đ
                            </span>
                            <span
                              className={clsx(styles.order_product__right__price, 'text-[16px]')}
                            >
                              {FormatPrice.format(item.giaBan - (item.giaBan * item.giamGia) / 100)}
                              đ
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className={clsx(styles.order_bottom)}>
                    <div className={clsx(styles.order_total, 'gap-2')}>
                      <Icon icon='icon-price' className='text-xl' />
                      <div className='flex items-center'>
                        <span className='text-xl'>Thành tiền:</span>
                        <span
                          className={clsx(
                            styles.order_product__right__price,
                            styles.order_total__price,
                          )}
                        >
                          {FormatPrice.format(totalOrder)} đ
                        </span>
                      </div>
                    </div>
                    <div className={clsx(styles.order_purchase)}>
                      {order[0].Order.trangThaiDH === 0 ? (
                        <button
                          // onClick={() => cancelOrder(order[0].Order.ID)}
                          className={clsx(styles.order_purchase__btn)}
                        >
                          Hủy đơn hàng
                        </button>
                      ) : order[0].Order.trangThaiDH === 1 ? (
                        <>
                          <Link to={`/Chitietsanpham/${order[0].productId}`}>
                            <button className={clsx(styles.order_purchase__btn)}>Mua lại</button>
                          </Link>
                          {order.every((obj1: any) =>
                            ratings?.data?.some((obj2: any) => obj1.productID === obj2.productId),
                          ) && (
                            <button
                              onClick={() => hanldeSeeEvaluate(order[0].orderID)}
                              className={clsx(styles.order_purchase__btnContact)}
                            >
                              Xem đánh giá
                            </button>
                          )}
                        </>
                      ) : (
                        <button className={clsx(styles.order_cancel__btn)}>Đơn hàng đã hủy</button>
                      )}
                      <button className={clsx(styles.order_purchase__btnContact)}>
                        Liên hệ người bán
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {visible && (
          <ModalRatings
            onRefresh={refresh}
            user={user}
            data={orderId}
            visible={visible}
            setVisible={setVisible}
          />
        )}

        {visible1 && (
          <ModalSussesRatings
            ratings={ratings}
            user={user}
            data={orderId}
            visible={visible1}
            setVisible={setVisible1}
          />
        )}
      </motion.div>
    </div>
  );
}

export default OrderPage;
