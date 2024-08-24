import clsx from 'clsx';
import Text from '@/components/UI/Text';
import { motion, spring } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './ListOrderProduct.module.scss';
import { useRequest } from 'ahooks';
import { serviceListOrder, serviceOrderAnnouce, serviceStatusOrder } from './service';
import Button from '@/components/UI/Button/Button';
import { Popover, Result, Row, Table } from 'antd';
import dayjs from 'dayjs';
import ModalOrderDetail from './ModalOrderDetail/ModalOrderDetail';
import { Icon } from '@/components/UI/IconFont/Icon';
import { toast } from '@/components/UI/Toast/toast';
import InputText from '@/components/UI/InputText';

function ListOrderProduct() {
  const { data: listOrder, refresh } = useRequest(serviceListOrder);
  const { data: listAnnouce } = useRequest(serviceOrderAnnouce);

  const { run: runStatusOder } = useRequest(serviceStatusOrder, {
    manual: true,
    onSuccess: () => {
      refresh();
      toast.success('Xác nhận đơn hàng thành công !');
    },
    onError: () => {
      toast.error('Xác nhận đơn hàng không thành công !');
    },
  });

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'ID',
      key: 'key',
      render: (text: any, record: any, index: number) => <strong>MDH{record?.ID}</strong>,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'tenKH',
      key: 'name',
    },
    {
      title: 'Thanh toán',
      dataIndex: 'phuongThucTT',
      key: 'phuongThucTT',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any, record: any, index: number) => (
        <Row wrap={false} align={'middle'} justify={'start'}>
          <Text element='span'>{dayjs(record?.createdAt).format('DD/MM/YYYY')}</Text>
        </Row>
      ),
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'trangThaiDH',
      key: 'trangThaiDH',
      render: (text: any, record: any, index: number) =>
        record.trangThaiDH === 1 ? (
          <Button className={clsx(styles.table_confirmed, 'text-sm rounded-md')}>
            Đã xác nhận
          </Button>
        ) : record.trangThaiDH === 0 ? (
          <Button
            onClick={() => handleStatusOrder(record)}
            className={clsx(styles.table_status, 'text-sm rounded-md')}
          >
            Xác nhận đơn hàng
          </Button>
        ) : (
          <Button className={clsx(styles.table_cancel, 'text-sm rounded-md')}>Đã hủy</Button>
        ),
    },
    {
      title: 'Chi tiết đơn hàng',
      dataIndex: 'detailOrder',
      key: 'detailOrder',
      render: (text: any, record: any, index: number) => (
        <ModalOrderDetail data={record}>
          <Row wrap={false} align={'middle'} justify={'end'}>
            <Button
              className={
                'bg-[#3ABAF4] text-white py-1.5 px-3 rounded-md !p-[10px] hover:bg-[#2b8eba]'
              }
            >
              Chi tiết
            </Button>
          </Row>
        </ModalOrderDetail>
      ),
    },
  ];

  const handleStatusOrder = (orderProduct: any) => {
    runStatusOder(orderProduct, 1);
  };

  return (
    <div className={clsx(styles.listOrderProduct, 'xs:w-full ')}>
      <div className={clsx(styles.listOrderProduct_header, 'flex-wrap  h-[44px]')}>
        <div className={'flex items-center'}>
          <Link to='/' className={'text-[#666666b3] no-underline hover:text-[#eb1336]'}>
            Quản lý đơn hàng
          </Link>
          <span className={'font-medium mx-[6px] text-[#344767] text-[18px]'}>/</span>
          <span className='text-[#344767] text-[18px] font-bold'>Danh sách đơn hàng</span>
        </div>

        <div className='flex'>
          <div className={clsx(styles.listOrderProduct_header__search)}>
            <InputText
              className='!h-[42px]'
              type='text'
              placeholder='Tìm kiếm...'
              //   ref={search}
              //   onChange={(event) => setSearchQuery(event.target.value)}
              //   onKeyDown={handleKeyPress}
            />
          </div>

          <Popover
            content={
              <>
                <div className={clsx('z-10')}>
                  <div className={clsx(styles.listOrderProduct_detailannouce__title)}>
                    <p>Bạn có {listAnnouce?.data.length} thông báo</p>
                  </div>
                  {listAnnouce?.data.map((listAnnouce: any) => {
                    return (
                      <div
                        className={clsx(
                          styles.listOrderProduct_detailannouce1,
                          'hover:bg-[#e4e4e4] rounded-lg mt-2',
                        )}
                      >
                        <div className={clsx(styles.listOrderProduct_detailannouce1__icon)}>
                          <Icon icon='icon-clip-board' />
                        </div>

                        <div className={clsx(styles.listOrderProduct_detailannouce1__inform)}>
                          <p>
                            {listAnnouce.tenKH} (MDH{listAnnouce.ID})
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            }
            trigger='click'
            placement='bottomRight'
          >
            <div className={clsx(styles.listOrderProduct_annouce)}>
              <div>
                <Icon icon='icon-bell' className='text-xl' />
                <span>{listAnnouce?.data.length}</span>
              </div>
            </div>
          </Popover>
        </div>
      </div>

      <div className={clsx(styles.listOrderProduct_PD, 'overflow-hidden overflow-x-scroll')}>
        <div className={clsx(styles.listOrderProduct_title, 'flex-wrap')}>
          <h1>Danh sách đơn hàng</h1>
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
            columns={listOrder?.data?.length > 0 ? columns : []}
            dataSource={listOrder?.data.map((item: any) => ({ ...item, key: item.ID })) || []}
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
              listOrder?.data?.length > 10
                ? {
                    total: listOrder?.data?.length || 0,
                    pageSize: 12,
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

export default ListOrderProduct;
