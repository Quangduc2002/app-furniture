import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { fetchUser, axiosPost } from '../../services/UseServices';
// import PayPal from '../Paypal/Paypal';
import { userDefault } from '@/store/Login/type';
import { useAtom } from 'jotai';
import { ROUTE_PATH } from '@/routes/route.constant';
import { atomListCart, atomListCartUser } from '@/store/type';
import { FormatPrice } from '@/utils/FormatPrice';
import { Icon } from '@/components/UI/IconFont/Icon';
import { GoBack } from '@/utils/GoBack';
import { useRequest } from 'ahooks';
import { serviceOrder } from './service';
import { toast } from '@/components/UI/Toast/toast';
import Button from '@/components/UI/Button/Button';
import PayPal from '@/components/Paypal/Paypal';

function CheckOut() {
  const [cartItems, setCartItems] = useAtom(atomListCart);
  const [tenKH, setTenKH] = useState<any>('');
  const [soDT, setSoDT] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [diaChi, setDiaChi] = useState<any>('');
  const [thanhToan, setThanhToan] = useState<any>('');
  const [note, setNote] = useState<any>('');
  const [isOrder, setIsOrder] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({});
  const [user] = useAtom(userDefault);
  const [listCartItems] = useAtom(atomListCartUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate(ROUTE_PATH.LOGIN);
    } else {
      setTenKH(user?.account?.getUser?.name);
      setEmail(user?.account?.getUser?.email);
    }
  }, [navigate, user]);

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

  const handleValidation = () => {
    let errors: any = {};
    let isValid = true;

    if (!tenKH) {
      errors.tenKH = 'Please enter name !';
      isValid = false;
    }

    if (!soDT) {
      errors.soDT = 'Please enter phone number !';
      isValid = false;
    }

    if (!email) {
      errors.email = 'Please enter email !';
      isValid = false;
    }

    if (!diaChi) {
      errors.diaChi = 'Please enter address !';
      isValid = false;
    }
    if (!thanhToan) {
      errors.thanhToan = 'Please enter select a payment method !';
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const { run: runOrder } = useRequest(
    () =>
      serviceOrder({
        Product: listCartItems,
        tenKH: tenKH,
        soDT: soDT,
        diaChi: diaChi,
        email: email,
        phuongThucTT: thanhToan,
        note: note,
        trangThaiDH: 0,
        maKH: user?.account?.getUser?.id,
        isPay: thanhToan === 'Chuyển khoản ngân hàng' ? true : false,
      }),
    {
      manual: true,
      onSuccess: () => {
        setCartItems(
          cartItems?.filter((item: any) => item.customer_id !== user?.account?.getUser?.id),
        ),
          setIsOrder(true);
        toast.success('Mua sản phẩm thành công ');
      },
    },
  );

  const handleOrder = async () => {
    if (user?.isAuthenticated) {
      if (handleValidation()) {
        runOrder();
      }
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

              <div className='px-3 md:w-5/12'>
                <div className='w-full mx-auto rounded-lg bg-white border border-solid border-gray-200 p-3 text-gray-800 font-light mb-6'>
                  <div className='w-full sm:flex gap-4 mb-3 items-center max-sm:block'>
                    <div className='sm:w-32 max-sm:w-full'>
                      <span className='text-gray-600 font-semibold'>Tên người nhận:</span>
                    </div>
                    <div className='flex-grow'>
                      <input
                        value={tenKH}
                        className={`${
                          formErrors.tenKH ? '!border-red-500' : ''
                        } w-full  border border-solid  px-2 focus:border-gray-300 outline-none focus:ring rounded-lg py-2`}
                        onChange={(e) => setTenKH(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='w-full sm:flex gap-4 mb-3 items-center max-sm:block'>
                    <div className='sm:w-32 xs:min-w-[80px]'>
                      <span className='text-gray-600 font-semibold'>Email:</span>
                    </div>
                    <div className='flex-grow'>
                      <input
                        className={`${
                          formErrors.email ? '!border-red-500' : ''
                        } w-full  border border-solid  px-2 focus:border-gray-300 outline-none focus:ring rounded-lg py-2`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='w-full sm:flex gap-4 mb-3 items-center max-sm:block'>
                    <div className=' sm:w-32 max-sm:w-full'>
                      <span className='text-gray-600 font-semibold'>Số điện thoại:</span>
                    </div>
                    <div className='flex-grow'>
                      <input
                        className={`${
                          formErrors.soDT ? '!border-red-500' : ''
                        } w-full  border border-solid  px-2 focus:border-gray-300 outline-none focus:ring rounded-lg py-2`}
                        value={soDT}
                        onChange={(e) => setSoDT(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='w-full gap-4 mb-3 sm:flex items-center max-sm:block'>
                    <div className='sm:w-32 max-sm:w-full'>
                      <span className='text-gray-600 font-semibold'>Địa chỉ:</span>
                    </div>
                    <div className='flex-grow'>
                      <input
                        className={`${
                          formErrors.diaChi ? '!border-red-500' : ''
                        } w-full border border-solid  px-2 focus:border-gray-300 outline-none focus:ring rounded-lg py-2`}
                        value={diaChi}
                        onChange={(e) => setDiaChi(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='w-full sm:flex gap-4 mb-3 items-center max-sm:block'>
                    <div className='sm:w-32 max-sm:w-full'>
                      <span className='text-gray-600 font-semibold'>Ghi chú:</span>
                    </div>
                    <div className='flex-grow'>
                      <textarea
                        className='w-full border-solid border  px-2 focus:border-gray-300 outline-none focus:ring rounded-lg py-2'
                        rows={1}
                        value={note}
                        id='company-dd'
                        onChange={(e) => setNote(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className='w-full sm:flex gap-4 mb-3 items-center max-sm:block flex-wrap'>
                    <div className='w-full'>
                      <span className='text-gray-600 font-semibold'>Phương thức thanh toán:</span>
                    </div>

                    <select
                      onChange={(e) => setThanhToan(e.target.value)}
                      className={`${
                        formErrors.thanhToan ? '!border-red-500' : ''
                      } py-2 px-2 w-full mt-2.5 border-solid focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-lg`}
                    >
                      <option className='hidden'>Phương thức thanh toán</option>
                      <option value='Thanh toán khi nhận hàng'>Thanh toán khi nhận hàng</option>
                      <option value='Chuyển khoản ngân hàng'>Chuyển khoản ngân hàng</option>
                    </select>
                  </div>
                </div>

                {thanhToan === 'Chuyển khoản ngân hàng' ? (
                  <PayPal
                    handleOrder={handleOrder}
                    amount={Math.round((tongTien + 300000) / 23500)}
                  />
                ) : (
                  <div>
                    <button
                      onClick={handleOrder}
                      className='block w-full bg-[#ee4d2d] hover:bg-[#c52432] text-white rounded-lg px-3 py-4 font-semibold'
                    >
                      <i className='mdi mdi-lock-outline mr-1'></i> Mua ngay
                    </button>
                  </div>
                )}
              </div>
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
