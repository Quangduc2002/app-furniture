import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, spring } from 'framer-motion';
import { useAtom } from 'jotai';
import { userDefault } from '@/store/Login/type';
import { Icon } from '@/components/UI/IconFont/Icon';
import { FormatPrice } from '@/utils/FormatPrice';
import { atomListCart, atomListCartUser } from '@/store/type';
import { ROUTE_PATH } from '@/routes/route.constant';
import ModalDelete from '@/pages/CartPage/ModalDelete/ModalDelete';
import { GoBack } from '@/utils/GoBack';

function Cart() {
  const [user] = useAtom(userDefault);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useAtom(atomListCart);
  const [listCartItems] = useAtom(atomListCartUser);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate(ROUTE_PATH.LOGIN);
    }
  }, [navigate, user?.isAuthenticated]);

  const totalMoney = listCartItems?.reduce(
    (item1: any, item2: any) =>
      item1 + (item2?.giaBan - (item2?.giaBan * item2?.giamGia) / 100) * item2?.qty,
    0,
  );

  const handleUpdateCartUp = (product: any) => {
    const exist = cartItems.find((cartItem: any) => {
      return cartItem.customer_id === user?.account?.getUser?.id && cartItem.ID === product.ID;
    });

    if (exist) {
      setCartItems(
        cartItems.map((cartItem: any) =>
          cartItem.ID === product.ID && cartItem.customer_id === user?.account?.getUser?.id
            ? {
                ...exist,
                qty: cartItem.qty + 1,
                total:
                  (1 + cartItem.qty) *
                  (cartItem.giaBan - (cartItem.giaBan * cartItem.giamGia) / 100),
              }
            : cartItem,
        ),
      );
    }
  };

  const handleUpdateCartDown = (product: any) => {
    const exist = cartItems.find((cartItem: any) => {
      return cartItem.ID === product.ID && cartItem.customer_id === user?.account?.getUser?.id;
    });

    if (exist && exist.qty > 1) {
      setCartItems(
        cartItems.map((cartItem: any) =>
          cartItem.ID === product.ID && cartItem.customer_id === user?.account?.getUser?.id
            ? {
                ...exist,
                qty: cartItem.qty - 1,
                total:
                  (cartItem.qty - 1) *
                  (cartItem.giaBan - (cartItem.giaBan * cartItem.giamGia) / 100),
              }
            : cartItem,
        ),
      );
    }
  };

  if (!user?.isAuthenticated) {
    return null;
  }

  return (
    <div className=' pt-20 pb-20'>
      {listCartItems.length === 0 ? (
        <motion.div
          initial={{ y: '4rem', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            type: spring,
          }}
        >
          <div className='text-center'>
            <img className='w-48 m-auto' alt='' src={'/Images/cart.png'} />
            <p className='text-[#ee4d2d] text-lg '>Chưa có sản phẩm nào trong giỏ hàng.</p>
          </div>
        </motion.div>
      ) : (
        <>
          <div className=' lg:w-[1170px] px-6 lg:m-auto mb-4'>
            <button
              onClick={GoBack}
              className='flex items-center border-none gap-1 bg-white hover:cursor-pointer focus:outline-none hover:underline no-underline text-gray-500 mb-2'
            >
              <Icon icon='icon-arrow-left' className='text-xl' />
              <span className='text-xl'>Quay lại</span>
            </button>
            <div className='mb-2'>
              <h1 className='text-3xl md:text-5xl font-bold text-gray-600'>Giỏ hàng</h1>
            </div>
          </div>

          <div className='lg:w-[1170px] mx-auto justify-center px-6 md:flex md:space-x-6 xl:px-0'>
            <div className='rounded-lg md:w-2/3'>
              {listCartItems &&
                listCartItems?.map((cartItem: any) => {
                  return (
                    <div
                      key={cartItem.ID}
                      className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'
                    >
                      <img
                        src={`/Images/${cartItem.image}`}
                        alt=''
                        className='w-full rounded-lg sm:w-40'
                      />
                      <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
                        <div className='sm:mt-0'>
                          <h2 className='text-lg font-bold text-gray-900'>{cartItem.tenSp}</h2>
                          <p className='mt-1 text-base text-left text-gray-700'>
                            Chất liệu: {cartItem.Meterial.tenChatLieu}
                          </p>
                        </div>
                        <div className='flex justify-between sm:block max-sm:mt-2'>
                          <div className='w-max sm:mb-4 rounded-sm border border-[#e8e8e8] border-solid gap-3 flex items-center justify-end xs:m-0'>
                            <span
                              className={`flex justify-center items-center w-8 h-8 hover:bg-[#eaeaea] border border-[#e8e8e8] border-solid ${
                                cartItem.qty === 1 ? 'hover:bg-transparent cursor-not-allowed' : ''
                              }`}
                              onClick={() => handleUpdateCartDown(cartItem)}
                            >
                              <Icon
                                icon='icon-minus'
                                className={`py-2 px-2 hover:text-gray-600 cursor-pointer  ${
                                  cartItem.qty === 1 ? 'cursor-not-allowed' : ''
                                }`}
                              />
                            </span>
                            <p className='flex items-center h-8 m-0 '>{cartItem.qty}</p>
                            <span
                              className='flex justify-center items-center w-8 h-8 hover:bg-[#eaeaea] border border-[#e8e8e8] border-solid'
                              onClick={() => handleUpdateCartUp(cartItem)}
                            >
                              <Icon
                                icon='icon-plus'
                                className='py-2 px-2 hover:text-gray-600 cursor-pointer'
                              />
                            </span>
                          </div>

                          <div className='flex items-center space-x-4 justify-between m-0'>
                            <p className='text-xl mb-0'>{FormatPrice.format(cartItem.total)}đ</p>
                            <ModalDelete data={cartItem} visible={visible} setVisible={setVisible}>
                              <Icon
                                icon='icon-close-line'
                                className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
                              />
                            </ModalDelete>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
              <div className='mb-2 flex justify-between'>
                <p className='text-gray-700'>Tổng tiền</p>
                <p className='text-gray-700'>{FormatPrice.format(totalMoney)}đ</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-gray-700'>Phí vận chuyển</p>
                <p className='text-gray-700'>{FormatPrice.format(300000)}đ</p>
              </div>
              <hr className='my-4' />
              <div className='flex justify-between'>
                <p className='text-lg font-bold'>Tổng tiền</p>
                <div className=''>
                  <p className='mb-1 text-lg font-bold'>
                    {FormatPrice.format(totalMoney + 300000)}đ
                  </p>
                </div>
              </div>
              <NavLink
                to={user?.isAuthenticated ? ROUTE_PATH.CHECKOUT : ROUTE_PATH.LOGIN}
                className='text-white no-underline'
              >
                <button className='mt-6 w-full rounded-md py-3 cursor-pointer border-none font-medium text-blue-50 bg-[#ee4d2d] hover:bg-[#c52432]'>
                  Thủ tục thanh toán
                </button>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
