import { useState } from 'react';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { FormatPrice } from '@/utils/FormatPrice';
import { useRequest } from 'ahooks';
import { serviceOrder } from './service';
import InputText from '@/components/UI/InputText';
import { Result, Table } from 'antd';
import Text from '@/components/UI/Text';

function ListOrderProductDetails() {
  const { data: orderDetail } = useRequest(serviceOrder);

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderID',
      key: 'key',
      render: (value: any, record: any, index: number) => <strong>MDH{value}</strong>,
    },
    {
      title: 'Ảnh sản phầm',
      dataIndex: 'Product',
      key: 'image',
      render: (value: any) => (
        <img className={clsx('w-[100px] h-[50px]')} src={`${value?.image}`} alt='' />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'tenSp',
      key: 'name',
    },
    {
      title: <Text className='text-center'>Số lượng</Text>,
      dataIndex: 'soLuong',
      key: 'soLuong',
      render: (value: any) => <Text className='text-center'>x{value}</Text>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'donGia',
      key: 'donGia',
      render: (value: any) => <Text className='text-right'>{FormatPrice.format(value)} đ</Text>,
    },
  ];

  return (
    <div className={clsx(styles.orderDetail, 'xs:w-full')}>
      <div className={clsx(styles.orderDetail_header, 'flex-wrap  h-[44px]')}>
        <div className={'flex items-center'}>
          <Link to='/' className={'text-[#666666b3] no-underline hover:text-[#eb1336]'}>
            Quản lý đơn hàng
          </Link>
          <span className={'font-medium mx-[6px] text-[#344767] text-[18px]'}>/</span>
          <span className='text-[#344767] text-[18px] font-bold'>Chi tiết đơn hàng</span>
        </div>

        <div className='flex'>
          <div className={clsx(styles.orderDetail_header__search)}>
            <InputText className='!h-[42px]' type='text' placeholder='Tìm kiếm...' />
          </div>
        </div>
      </div>

      <div className={clsx(styles.orderDetail_PD, 'overflow-hidden overflow-x-scroll')}>
        <div>
          <h1>Chi tiết đơn hàng</h1>

          <motion.div
            className='overflow-x-auto overflow-hidden pb-5'
            initial={{ y: '4rem', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              type: spring,
            }}
          >
            <Table
              columns={orderDetail?.data?.length > 0 ? columns : []}
              dataSource={orderDetail?.data.map((item: any) => ({ ...item, key: item.ID })) || []}
              locale={{
                emptyText: (
                  <Result
                    icon={
                      <img
                        src={'/svg/NoFile.svg'}
                        alt='Empty Data'
                        className='w-[148px] h-[160px] m-auto'
                      />
                    }
                    title='Chưa có thông tin'
                  />
                ),
              }}
              pagination={
                orderDetail?.data?.length > 10
                  ? {
                      total: orderDetail?.data?.length || 0,
                      pageSize: 12,
                      align: 'center',
                    }
                  : false
              }
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ListOrderProductDetails;
