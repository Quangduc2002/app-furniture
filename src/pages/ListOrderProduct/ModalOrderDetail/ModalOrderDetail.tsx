import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import { Col, Result, Row, Table } from 'antd';
import Text from '@/components/UI/Text';
import styles from '../ListOrderProduct.module.scss';
import { useEffect, useState } from 'react';
import { ModalIprops } from '@/components/UI/Modal/type';
import clsx from 'clsx';
import { useRequest } from 'ahooks';
import { serviceOrderDetail } from '../service';
import { FormatPrice } from '@/utils/FormatPrice';

interface IModalOrderDetail {
  currentPage?: number;
}

const ModalOrderDetail: React.FC<ModalIprops & IModalOrderDetail> = ({
  data,
  children,
  onRefresh,
  action,
  disabled,
  currentPage = 1,
}) => {
  const [visible, setVisible] = useState(false);

  const { data: orderDetail, run } = useRequest(serviceOrderDetail, {
    manual: true,
  });

  useEffect(() => {
    if (visible) {
      run(data?.ID);
    }
  }, [data, visible]);

  let total = 0;
  for (let i = 0; i < orderDetail?.data?.length; i++) {
    total += orderDetail?.data[i]?.donGia;
  }

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderID',
      key: 'key',
      render: (value: any) => <strong>MDH{value}</strong>,
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
      render: (value: any) => <Text className='text-center'>{FormatPrice.format(value)}đ</Text>,
    },
  ];

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom title={'Chi tiết hóa đơn'} open={visible} onCancel={() => setVisible(false)}>
        <div className='h-[300px] overflow-y-scroll scrollbar-hide'>
          <Col className='py-4 border-b flex flex-col gap-2'>
            <Row>
              <Text element='h2' className='text-[20px] min-w-[160px]'>
                Tên khách hàng:
              </Text>{' '}
              <Text element='h2' className='text-[20px]'>
                {orderDetail?.data[0]?.Order?.tenKH}
              </Text>
            </Row>

            <Row>
              <Text element='h2' className='text-[20px] min-w-[160px]'>
                Địa chỉ:
              </Text>{' '}
              <Text element='h2' className='text-[20px]'>
                {orderDetail?.data[0]?.Order?.diaChi}
              </Text>
            </Row>

            <Row>
              <Text element='h2' className='text-[20px] min-w-[160px]'>
                Số điện thoại:
              </Text>{' '}
              <Text element='h2' className='text-[20px]'>
                {orderDetail?.data[0]?.Order?.soDT}
              </Text>
            </Row>
          </Col>

          <Table
            dataSource={orderDetail?.data || []}
            columns={orderDetail?.data.length > 0 ? columns : []}
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
            pagination={false}
          />

          <div className={clsx(styles.modal_footer)}>
            <Text>
              Tổng tiền hóa đơn: &nbsp;
              <Text className='text-xl' element='span'>
                {FormatPrice.format(total)}đ
              </Text>
            </Text>
          </div>
        </div>
      </ModalCustom>
    </>
  );
};

export default ModalOrderDetail;
