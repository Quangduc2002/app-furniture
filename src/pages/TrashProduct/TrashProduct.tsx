import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Trash.module.scss';
import Button from '@/components/UI/Button/Button';
import ModalDelete from '../ListProduct/ModalDelete';
import { Result, Row, Table } from 'antd';
import { Icon } from '@/components/UI/IconFont/Icon';
import { FormatPrice } from '@/utils/FormatPrice';
import getListProducts from '@/store/Home/ListProducts';
import Text from '@/components/UI/Text';
import { motion, spring } from 'framer-motion';
import { useRequest } from 'ahooks';
import { serviceGetTrash } from './service';
import ModalTrash from './ModalTrash/ModalTrash';

function TrashProduct() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(12);
  const [action, setAction] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'ID',
      key: 'key',
      render: (text: any, record: any, index: number) => (
        <strong>{(currentPage - 1) * pageSize + index + 1}</strong>
      ),
    },
    {
      title: 'tên sản phẩm',
      dataIndex: 'tenSp',
      key: 'tenSp',
    },
    {
      title: 'chất liệu',
      dataIndex: 'Meterial',
      key: 'Meterial',
      render: (value: any) => <Text>{value?.tenChatLieu}</Text>,
    },
    {
      title: 'Kích thước',
      dataIndex: 'kichThuoc',
      key: 'kichThuoc',
    },
    {
      title: 'giá bán',
      dataIndex: 'giaBan',
      key: 'giaBan',
      render: (_: any, record: any) => (
        <Row wrap={false} align={'middle'} justify={'start'}>
          {FormatPrice.format(record?.giaBan)}&nbsp;VND
        </Row>
      ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>số lượng</div>,
      dataIndex: 'soLuong',
      key: 'soLuong',
      render: (_: any, record: any) => (
        <Row wrap={false} align={'middle'} justify={'center'}>
          {record?.soLuong}
        </Row>
      ),
    },
  ];

  const { data: products, refresh: onRefresh } = useRequest(serviceGetTrash);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: 'checkbox' as const,
  };

  return (
    <div className={clsx(styles.listProduct, 'xs:w-full ')}>
      <div className={clsx(styles.listProduct_header, 'flex-wrap ')}>
        <div className={clsx(styles.breadcrumbs)}>
          <Link to='/' className={clsx(styles.Link)}>
            Trang
          </Link>
          <span className={clsx(styles.divider)}>/</span>
          <span>Danh sách sản phẩm đã xóa</span>
        </div>
      </div>

      <div className={clsx(styles.listProduct_PD, 'overflow-hidden overflow-x-scroll')}>
        <div className='flex flex-col gap-4'>
          <h1>Danh sách sản phẩm đã xóa</h1>
          <div className={clsx(styles.listProduct_action, 'flex-wrap gap-4')}>
            <select
              onChange={(e) => setAction(e.target.value)}
              className={clsx(styles.listProduct_action__select)}
              required
            >
              <option value=''>--Chọn hành động--</option>
              <option value='restore'>Khôi phục</option>
              <option value='delete'>Xóa</option>
            </select>
            <ModalTrash
              data={selectedRowKeys}
              action={action}
              disabled={action === ''}
              onRefresh={onRefresh}
            >
              <Button
                disabled={
                  action === '' || selectedRowKeys.length === 0 || products?.data?.length === 0
                }
                type='xhotel-negative-primary'
              >
                Thực hiện
              </Button>
            </ModalTrash>
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
            rowSelection={products?.data?.length > 0 ? rowSelection : undefined}
            columns={products?.data?.length > 0 ? columns : []}
            dataSource={products?.data.map((item: any) => ({ ...item, key: item.ID })) || []}
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
              products?.data?.length > 10
                ? {
                    total: products?.data?.length || 0,
                    pageSize: pageSize,
                    align: 'center',
                  }
                : false
            }
            onChange={(e) => setCurrentPage(e?.current)}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default TrashProduct;
