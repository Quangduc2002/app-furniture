import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userDefault } from '@/store/Login/type';
import { useAtom } from 'jotai';
import { ROUTE_PATH } from '@/routes/route.constant';
import { atomListCart, atomListCartUser, atomOrderInfo } from '@/store/type';
import { FormatPrice } from '@/utils/FormatPrice';
import { Icon } from '@/components/UI/IconFont/Icon';
import { GoBack } from '@/utils/GoBack';
import { useRequest, useUpdateEffect } from 'ahooks';
import { serviceOrder } from './service';
import { toast } from '@/components/UI/Toast/toast';
import Button from '@/components/UI/Button/Button';
import { Form } from 'antd';
import InputText from '@/components/UI/InputText';
import Text from '@/components/UI/Text';
import InputTextArea from '@/components/UI/InputTextArea/InputTextArea';
import SelectCustom from '@/components/UI/SelectCustom';
import ModalPayment from './ModalPayment/ModalPayment';

function CheckOut() {
  const [form] = Form.useForm();
  const [disable, setDisabled] = useState<boolean>(true);
  const allValues = Form.useWatch([], form);
  const [, setOrderInfo] = useAtom(atomOrderInfo);
  const [cartItems, setCartItems] = useAtom(atomListCart);
  const [payment, setPayment] = useState<any>('');
  const [isOrder, setIsOrder] = useState<boolean>(false);
  const [user] = useAtom(userDefault);
  const [listCartItems] = useAtom(atomListCartUser);
  const navigate = useNavigate();

  const methodPayment = [
    {
      label: 'Thanh toán khi nhận hàng',
      value: 'Thanh toán khi nhận hàng',
    },
    {
      label: 'Chuyển khoản ngân hàng',
      value: 'Chuyển khoản ngân hàng',
    },
  ];

  useEffect(() => {
    if (user && user.isAuthenticated) {
      form.setFieldsValue({
        name: user?.account?.getUser?.name,
        email: user?.account?.getUser?.email,
      });
    }
  }, [user]);

  useUpdateEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setDisabled(false);
      },
      (error) => {
        if (error?.errorFields?.length > 0) {
          setDisabled(true);
        }
      },
    );
  }, [allValues]);

  useEffect(() => {
    if (isOrder) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isOrder]);

  useEffect(() => {
    if (listCartItems.length === 0) {
      setIsOrder(true);
    } else {
      setIsOrder(false);
    }
  }, [listCartItems]);

  const { run: runOrder } = useRequest(serviceOrder, {
    manual: true,
    onSuccess: () => {
      setCartItems(
        cartItems?.filter((item: any) => item.customer_id !== user?.account?.getUser?.id),
      ),
        setIsOrder(true);
      toast.success('Mua sản phẩm thành công ');
    },
  });

  const onSubmit = async (values: any) => {
    const newOrderInfo = {
      Product: listCartItems,
      tenKH: values.name,
      soDT: values.phone,
      diaChi: values.address,
      email: values.email,
      phuongThucTT: values.payment,
      note: values.note,
      trangThaiDH: 0,
      maKH: user?.account?.getUser?.id,
      isPay: values.payment === 'Chuyển khoản ngân hàng',
    };

    setOrderInfo(newOrderInfo);
    if (values.payment !== 'Chuyển khoản ngân hàng') {
      handleOrder(newOrderInfo);
    }
  };

  const handleOrder = async (orderInfo: any) => {
    if (user?.isAuthenticated) {
      runOrder(orderInfo);
    } else {
      navigate(ROUTE_PATH.LOGIN);
    }
  };

  let tongTien = 0;
  if (user?.isAuthenticated === false && listCartItems.length) {
    return null;
  }

  return (
    <div className={`${isOrder ? 'py-10' : 'min-w-screen py-5'} bg-gray-50`}>
      {!isOrder && (
        <div className='lg:max-w-[1170px] lg:m-auto px-5 mb-4'>
          <button
            onClick={GoBack}
            className='flex items-center border-none gap-1 bg-white hover:cursor-pointer focus:outline-none hover:underline no-underline text-gray-500 mb-2'
          >
            <Icon icon='icon-arrow-left' className='text-xl' />
            <span className='text-xl'>Quay lại</span>
          </button>
          <div className='mb-2'>
            <h1 className='text-3xl md:text-5xl font-bold text-gray-600'>Thủ tục thanh toán</h1>
          </div>
        </div>
      )}

      <div className='lg:max-w-[1170px] lg:m-auto lg:border border-solid lg:rounded-md w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800'>
        <div className='w-full'>
          {!isOrder && (
            <div className='-mx-3 md:flex items-start'>
              <div className='px-3 md:w-7/12 lg:pr-10'>
                {listCartItems &&
                  listCartItems.map((cartItem: any) => {
                    tongTien += cartItem.total;
                    return (
                      <div
                        key={cartItem.ID}
                        className='w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6'
                      >
                        <div className='w-full flex gap-4 items-center'>
                          <div className='overflow-hidden rounded-lg min-w-16 h-16 bg-gray-50 border border-gray-200'>
                            <img className='w-16 h-16' src={`${cartItem.image}`} alt='' />
                          </div>

                          <div className='sm:flex gap-4 justify-between'>
                            <div>
                              <h6 className='font-semibold uppercase text-xl max-sm:text-lg text-gray-600 break-all line-clamp-1'>
                                {cartItem.tenSp}
                              </h6>
                              <p className='text-gray-500 text-lg'>x {cartItem.qty}</p>
                            </div>
                            <div>
                              <span className='font-semibold text-gray-600 text-xl max-sm:text-lg'>
                                {FormatPrice.format(cartItem.total)}đ
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                <div className='mb-6 pb-6 border-bottom text-gray-800'>
                  <div className='w-full flex mb-3 items-center'>
                    <div className='flex-grow'>
                      <span className='text-gray-600 text-xl'>Tổng tiền</span>
                    </div>
                    <div className='pl-3'>
                      <span className='font-semibold text-xl'>{FormatPrice.format(tongTien)}đ</span>
                    </div>
                  </div>
                  <div className='w-full flex items-center'>
                    <div className='flex-grow'>
                      <span className='text-gray-600 text-xl'>Phí vận chuyển</span>
                    </div>
                    <div className='pl-3'>
                      <span className='font-semibold text-xl'> {FormatPrice.format(300000)}đ</span>
                    </div>
                  </div>
                </div>

                <div className='mb-6 pb-6 md:border-none text-gray-800'>
                  <div className='w-full flex items-center'>
                    <div className='flex-grow'>
                      <span className='text-gray-600 text-2xl'>Tổng tiền đơn hàng</span>
                    </div>
                    <div className='pl-3'>
                      <span className='font-semibold text-2xl'>
                        {FormatPrice.format(tongTien + 300000)}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Form form={form} onFinish={onSubmit} layout='vertical' className='px-3 md:w-5/12'>
                <div className='w-full flex flex-col gap-3 mx-auto rounded-lg bg-white border border-solid border-gray-200 p-3 text-gray-800 font-light mb-6'>
                  <Form.Item
                    label={<Text>Tên người nhận:</Text>}
                    name='name'
                    rules={[{ required: true, message: 'Tên người nhận là bắt buộc' }]}
                  >
                    <InputText />
                  </Form.Item>

                  <Form.Item
                    label={<Text>Email:</Text>}
                    name='email'
                    rules={[{ required: true, message: 'Email là bắt buộc' }]}
                  >
                    <InputText disabled={true} />
                  </Form.Item>

                  <Form.Item
                    label={<Text>Số điện thoại:</Text>}
                    name='phone'
                    rules={[{ required: true, message: 'Số điện thoại là bắt buộc' }]}
                  >
                    <InputText />
                  </Form.Item>

                  <Form.Item
                    label={<Text>Địa chỉ:</Text>}
                    name='address'
                    rules={[{ required: true, message: 'Địa chỉ là bắt buộc' }]}
                  >
                    <InputText />
                  </Form.Item>

                  <Form.Item label={<Text>Ghi chú:</Text>} name='note'>
                    <InputTextArea className='rounded-[10px]' />
                  </Form.Item>

                  <Form.Item
                    rules={[{ required: true, message: 'Phương thức thanh toán là bắt buộc' }]}
                    label={<Text>Phương thức thanh toán:</Text>}
                    name='payment'
                  >
                    <SelectCustom
                      options={methodPayment}
                      value={payment}
                      placeholder='Chọn phương thức thanh toán'
                      onChange={(value) => setPayment(value)}
                    />
                  </Form.Item>
                </div>

                {payment === 'Chuyển khoản ngân hàng' ? (
                  <ModalPayment
                    handleOrder={handleOrder}
                    amount={Math.round((tongTien + 300000) / 23500)}
                  >
                    <Button
                      htmlType='submit'
                      disabled={disable}
                      type='xhome-negative-primary'
                      className=' w-full '
                    >
                      Thanh toán
                    </Button>
                  </ModalPayment>
                ) : (
                  <Button
                    htmlType='submit'
                    disabled={disable}
                    type='xhome-negative-primary'
                    className=' w-full '
                  >
                    Mua ngay
                  </Button>
                )}
              </Form>
            </div>
          )}

          {isOrder && (
            <div className='flex flex-col gap-4 text-center'>
              <div className='flex items-center justify-center gap-2'>
                <Icon className='w-10 h-10 text-[#ee4d2d]' icon='icon-shield-check' />
                <p className='text-xl'>Đặt hàng thành công</p>
              </div>
              <p>
                Cùng shop bảo vệ quyền lợi của bạn - chỉ nhận hàng & thánh toán khi đơn mua ở trạng
                thái "Đang giao hàng"{' '}
              </p>
              <div className='flex gap-4 justify-center'>
                <Link to={ROUTE_PATH.HOME}>
                  <Button type='xhotel-negative-primary' className='w-[96px]'>
                    Trang chủ
                  </Button>
                </Link>
                <Button type='xhotel-negative-secondary' className='w-[96px]'>
                  Đơn mua
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
