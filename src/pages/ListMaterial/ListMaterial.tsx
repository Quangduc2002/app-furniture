import { Icon } from '@/components/UI/IconFont/Icon';
import { motion, spring } from 'framer-motion';
import Text from '@/components/UI/Text';
import { Link } from 'react-router-dom';
import Button from '@/components/UI/Button/Button';
import InputText from '@/components/UI/InputText';
import { useRequest } from 'ahooks';
import { serviceMaterial } from './service';
import { Result, Row, Table } from 'antd';
import { useState } from 'react';
import ModalMaterial from './ModalMaterial/ModalMaterial';
import ModalDeleteMaterial from './ModalDeleteMaterial/ModalDeleteMaterial';

function ListMaterial() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(12);
  const { data: Materials, refresh: onRefresh } = useRequest(serviceMaterial);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'key',
      render: (text: any, record: any, index: number) => (
        <strong>{(currentPage - 1) * pageSize + index + 1}</strong>
      ),
    },
    {
      title: 'Tên chất liệu',
      dataIndex: 'tenChatLieu',
      key: 'tenChatLieu',
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Row wrap={false} align={'middle'} justify={'end'}>
          <ModalMaterial data={record} onRefresh={onRefresh}>
            <p className='w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[var(--primary-8)] transition-all'>
              <Icon icon='icon-pen-fill' className='text-[18px]' color='text-icon' />
            </p>
          </ModalMaterial>
          <ModalDeleteMaterial data={record} onRefresh={onRefresh}>
            <p className='w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[var(--primary-8)] transition-all'>
              <Icon icon='icon-trash-fill' className='text-[24px] text-[--error-main]' />
            </p>
          </ModalDeleteMaterial>
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
          <span className='text-[#344767] text-[18px] font-bold'>Quản lý chất liệu</span>
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
              Danh sách chất liệu
            </Text>
          </div>

          <div className={'flex my-4 flex-wrap gap-2 pl-2.5'}>
            <ModalMaterial onRefresh={onRefresh}>
              <Button type='xhotel-negative-primary' className='flex items-center !py-3 h-full'>
                <Icon icon='icon-plus' className='mr-[6px]' />
                Thêm chất liệu
              </Button>
            </ModalMaterial>

            <div>
              <select
                className='p-[12px] rounded-[20px] text-[#666666d9] bg-[#f4f5f9] border border-[#ccc} outline-none'
                onChange={(e) => setPageSize(e.target.value)}
              >
                <option className='hidden'>Hiển thị</option>
                <option value={Materials?.data?.length}>Tất cả</option>
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
            columns={Materials?.data?.length > 0 ? columns : []}
            dataSource={Materials?.data.map((item: any) => ({ ...item, key: item.ID })) || []}
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
              Materials?.data?.length > pageSize
                ? {
                    total: Materials?.data?.length || 0,
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

export default ListMaterial;
