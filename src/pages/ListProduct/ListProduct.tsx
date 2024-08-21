import clsx from 'clsx';
import styles from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { motion, spring } from 'framer-motion';
import { Icon } from '@/components/UI/IconFont/Icon';
import getListProducts from '@/store/Home/ListProducts';
import { useEffect, useState } from 'react';
import { Result, Row, Table } from 'antd';
import Text from '@/components/UI/Text';
import { FormatPrice } from '@/utils/FormatPrice';
import ModalDelete from './ModalDelete';
import Button from '@/components/UI/Button/Button';
import { ROUTE_PATH } from '@/routes/route.constant';

function ListProduct() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(12);
  const [action, setAction] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { handleSearch, products, onRefresh } = getListProducts({});
  useEffect(() => {
    handleSearch('');
  }, []);

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
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Row wrap={false} align={'middle'} justify={'end'}>
          <p
            onClick={() => navigate(ROUTE_PATH.EDITPRODUCT(record.ID, 'update'))}
            className='w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[var(--primary-8)] transition-all'
          >
            <Icon icon='icon-pen-fill' className='text-[18px]' color='text-icon' />
          </p>
          <ModalDelete data={record} onRefresh={onRefresh}>
            <p className='w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[var(--primary-8)] transition-all'>
              <Icon icon='icon-trash-fill' className='text-[24px] text-[--error-main]' />
            </p>
          </ModalDelete>
        </Row>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: 'checkbox' as const,
  };

  return (
    <div className={clsx(styles.listProduct, 'xs:w-full')}>
      <div className={clsx(styles.listProduct_header, 'flex-wrap')}>
        <div className={clsx(styles.breadcrumbs)}>
          <Link to='/' className={clsx(styles.Link)}>
            Trang
          </Link>
          <span className={clsx(styles.divider)}>/</span>
          <span>Quản lý sản phẩm</span>
        </div>
        <div style={{ display: 'flex' }}>
          <div className={clsx(styles.listProduct_header__search)}>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              // value={searchQuery}
              // ref={search}
              // onChange={(event) => setSearchQuery(event.target.value)}
              // onKeyDown={handleKeyPress}
            />
            {/* {searchQuery && (
              <i
                onClick={HandleClear}
                className={clsx(styles.listProduct_header__xmark, 'fa-solid fa-xmark')}
              ></i>
            )} */}
          </div>
          <div className={clsx(styles.listProduct_annouce)}>
            <div>
              <Icon icon='icon-bell' />
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(styles.listProduct_PD, 'overflow-hidden overflow-x-scroll')}>
        <div className={clsx(styles.listProduct_title, 'flex-wrap')}>
          <div className='flex flex-col gap-4'>
            <h1>Danh sách sản phẩm</h1>
            <div className={clsx(styles.listProduct_action, 'flex-wrap gap-4')}>
              <select
                onChange={(e) => setAction(e.target.value)}
                className={clsx(styles.listProduct_action__select)}
                required
              >
                <option value=''>--Chọn hành động--</option>
                <option value='delete'>Xóa</option>
              </select>
              <ModalDelete
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
              </ModalDelete>
            </div>
          </div>

          <div className={clsx(styles.listProduct_title__right, 'my-4 flex-wrap gap-2 pl-2.5')}>
            <Link to={ROUTE_PATH.ADDPRODUCT('new')}>
              <Button type='xhotel-negative-primary' className='flex items-center !py-3 h-full'>
                <Icon icon='icon-plus' className='mr-[6px]' />
                Thêm sản phẩm
              </Button>
            </Link>

            <div className={clsx(styles.listProduct_title__right__show)}>
              <select
                className={clsx(styles.home_title__show)}
                onChange={(e) => setPageSize(e.target.value)}
              >
                <option style={{ display: 'none' }}>Hiển thị</option>
                <option value={products?.data?.length}>Tất cả</option>
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
            rowSelection={rowSelection}
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

export default ListProduct;
