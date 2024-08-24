import Button from '@/components/UI/Button/Button';
import InputText from '@/components/UI/InputText';
import { Result, Row, Table } from 'antd';
import { motion, spring } from 'framer-motion';
import { Link } from 'react-router-dom';
import Text from '@/components/UI/Text';
import { Icon } from '@/components/UI/IconFont/Icon';
import { useRequest } from 'ahooks';
import { serviceGetCustomer, serviceStatisCustomer } from './service';
import { useState } from 'react';
import { FormatPrice } from '@/utils/FormatPrice';
import ModalDeleteCustomer from './ModalDeleteCustomer/ModalDeleteCustomer';

function ManageCustomer() {
  const [pageSize, setPageSize] = useState<any>(12);
  const [statisticCustomer, setStatisticCustomer] = useState<any>('');
  const { data: dataStatisCustomer, run, refresh: onRefresh } = useRequest(serviceStatisCustomer);

  const handleStatisticCustomers = async () => {
    run({ statisticCustomer: statisticCustomer });
  };

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tồng tiền hàng',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      defaultSortOrder: 'descend' as 'descend',
      sorter: (a: any, b: any) => a.totalPrice - b.totalPrice,
      render: (value: any) => <Text>{FormatPrice.format(value)}đ</Text>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value: any) => {
        return value === true ? (
          <Text className='bg-[--x-home-main] text-white py-2 px-4 w-max rounded-[30px]'>
            Đang hoạt động
          </Text>
        ) : (
          <Text className='bg-[--error-light] text-white py-2 px-4 w-max rounded-[30px]'>
            Đã khóa
          </Text>
        );
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Row wrap={false} align={'middle'} justify={'end'}>
          {!record?.status ? (
            <ModalDeleteCustomer data={record} onRefresh={onRefresh}>
              <p className='w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[var(--primary-8)] transition-all'>
                <Icon icon='icon-lock-unlocked' className='text-[24px] text-[--x-home-main]' />
              </p>
            </ModalDeleteCustomer>
          ) : (
            <ModalDeleteCustomer data={record} onRefresh={onRefresh}>
              <p className='w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[var(--primary-8)] transition-all'>
                <Icon icon='icon-lock' className='text-[24px] text-[--error-main]' />
              </p>
            </ModalDeleteCustomer>
          )}
        </Row>
      ),
    },
  ];

  return (
    <div className={'xs:w-full overflow-hidden overflow-y-scroll p-[24px]'}>
      <div className={'flex mb-[40px] px-[16px] h-[44px] items-center justify-between flex-wrap'}>
        <div className={'flex items-center'}>
          <Link to='/' className={'text-[#666666b3] no-underline hover:text-[#eb1336]'}>
            Trang
          </Link>
          <span className={'font-medium mx-[6px] text-[#344767] text-[18px]'}>/</span>
          <span className='text-[#344767] text-[18px] font-bold'>Danh sách khách hàng</span>
        </div>
        <div className='flex'>
          <div className='relative flex items-center justify-center'>
            <InputText
              type='text'
              placeholder='Tìm kiếm...'
              className='!bg-transparent !placeholder-[#9095ab] border border-[#d3d3d3] rounded-[6px] p-[12px] focus:!border-[#6a5a9f]'
              // value={searchQuery}
              // ref={search}
              // onChange={(event) => setSearchQuery(event.target.value)}
              // onKeyDown={handleKeyPress}
            />
            {/* {searchQuery && (
              <i
                onClick={HandleClear}
                className={(styles.listProduct_header__xmark, 'fa-solid fa-xmark')}
              ></i>

            )} */}
          </div>
        </div>
      </div>

      <div className={'overflow-hidden overflow-x-scroll p-[30px] !pt-0 bg-white rounded-[10px]'}>
        <div className={'flex items-center justify-between pt-[20px] mb-[20px] flex-wrap'}>
          <div className='flex flex-col gap-4'>
            <Text className='text-[#344767] text-[24px]' element='h1'>
              Danh sách khách hàng
            </Text>
            <div className='mb-6'>
              <p>Chọn phương thức thống kê:</p>
              <div className='flex justify-between flex-wrap gap-3 mt-2'>
                <div className='flex flex-wrap gap-3 '>
                  <select
                    onChange={(e) => setStatisticCustomer(e.target.value)}
                    className='py-2 px-2 xxs:w-auto xs:w-full  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm '
                  >
                    <option className='hidden'>--Chọn hành động--</option>
                    <option value={'2 khách hàng có tiền hàng lớn nhất'}>
                      2 khách hàng có tiền hàng lớn nhất
                    </option>
                  </select>
                  <Button
                    onClick={handleStatisticCustomers}
                    disabled={!statisticCustomer}
                    type='xhome-negative-primary'
                  >
                    Thống kê
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className={'flex my-4 flex-wrap gap-2 pl-2.5'}>
            <div>
              <select
                className='p-[12px] rounded-[20px] text-[#666666d9] bg-[#f4f5f9] border border-[#ccc} outline-none'
                onChange={(e) => setPageSize(e.target.value)}
              >
                <option className='hidden'>Hiển thị</option>
                <option value={dataStatisCustomer?.data?.length}>Tất cả</option>
                <option value='4'>4</option>
                <option value='8'>8</option>
              </select>
            </div>
          </div>
        </div>

        <motion.div
          className='overflow-hidden  overflow-x-auto pb-5'
          initial={{ y: '4rem', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            type: spring,
          }}
        >
          <Table
            columns={dataStatisCustomer?.data?.length > 0 ? columns : []}
            dataSource={
              dataStatisCustomer?.data.map((item: any) => ({ ...item, key: item.ID })) || []
            }
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
              triggerDesc: 'Hiển thị tổng tiền giảm dần',
              triggerAsc: 'Hiển thị tổng tiền tăng dần',
              cancelSort: 'Hủy sắp xếp',
            }}
            pagination={
              dataStatisCustomer?.data?.length > pageSize
                ? {
                    total: dataStatisCustomer?.data?.length || 0,
                    pageSize: pageSize,
                    align: 'center',
                  }
                : false
            }
          />
        </motion.div>
      </div>
    </div>
  );
}

export default ManageCustomer;
