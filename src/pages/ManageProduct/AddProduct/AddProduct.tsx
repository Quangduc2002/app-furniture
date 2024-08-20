import React, { useMemo } from 'react';
import clsx from 'clsx';
import styles from '../index.module.scss';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/UI/IconFont/Icon';
import Button from '@/components/UI/Button/Button';
import { Col, Form, Row } from 'antd';
import InputText from '@/components/UI/InputText';
import SelectCustom from '@/components/UI/SelectCustom';
import { useRequest } from 'ahooks';
import { serviceMeterial } from '../service';
import InputCurrency from '@/components/UI/InputCurrency/InputCurrency';

function AddProduct() {
  const { data: dataMeterial } = useRequest(serviceMeterial);

  const selectMeterial = useMemo(() => {
    return dataMeterial?.data?.map((item: any) => {
      return {
        label: item?.tenChatLieu,
        value: item?.id,
      };
    });
  }, [dataMeterial?.data]);

  return (
    <div className={clsx(styles.listProduct, 'xs:w-full')}>
      <div className={clsx(styles.listProduct_header, 'flex-wrap')}>
        <div className='flex items-center gap-4 w-max'>
          <Icon icon='icon-arrow-left' className='text-[24px] cursor-pointer' />
          <span className='text-xl font-bold'>Quản lý sản phẩm</span>
        </div>
        <div className='flex gap-4'>
          <Button className='w-[100px] !py-3' type='xhome-purple-negative-secondary'>
            Hủy
          </Button>
          <Button className='w-[100px] !py-3' type='xhome-negative-primary'>
            Xác nhận
          </Button>
        </div>
      </div>

      <div>
        <Col span={24} className='mb-[24px] px-3'>
          <Form.Item
            name='tenSp'
            label='Tên sản phẩm'
            rules={[{ required: true, message: 'Tên sản phẩm là bắt buộc' }]}
          >
            <InputText placeholder='Nhập tên sản phẩm' />
          </Form.Item>
        </Col>

        <Row>
          <Col span={12} className='mb-[24px] px-3'>
            <Form.Item
              name='tenSp'
              label='Chất liệu'
              rules={[{ required: true, message: 'Chất liệu là bắt buộc' }]}
            >
              <InputText placeholder='Nhập chất liệu' />
            </Form.Item>
          </Col>

          <Col span={12} className='mb-[24px] px-3'>
            <Form.Item
              name='tenSp'
              label='Loại phòng'
              rules={[{ required: true, message: 'Chọn loại phòng là bắt buộc' }]}
            >
              <SelectCustom placeholder='Chọn loại phòng' options={selectMeterial} allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Row wrap={false}>
          <Col span={12} className='mb-[24px] px-3'>
            <Form.Item
              name='tenSp'
              label='Giá nhập'
              rules={[{ required: true, message: 'Giá nhập là bắt buộc' }]}
            >
              <InputCurrency placeholder='Nhập giá nhập' addonAfter='Đồng' />
            </Form.Item>
          </Col>

          <Col span={12} className='mb-[24px] px-3'>
            <Form.Item
              name='tenSp'
              label='Giá bán'
              rules={[{ required: true, message: 'Giá bán là bắt buộc' }]}
            >
              <InputCurrency placeholder='Nhập giá bán' addonAfter='Đồng' />
            </Form.Item>
          </Col>
        </Row>

        <Row wrap={false}>
          <Col span={8} className='mb-[24px] px-3'>
            <Form.Item
              name='tenSp'
              label='Số lượng'
              rules={[{ required: true, message: 'Số lượng là bắt buộc' }]}
            >
              <InputCurrency placeholder='Nhập số lượng' />
            </Form.Item>
          </Col>

          <Col span={8} className='mb-[24px] px-3'>
            <Form.Item
              name='tenSp'
              label='Kích thước'
              rules={[{ required: true, message: 'Kích thước là bắt buộc' }]}
            >
              <InputText placeholder='Nhập kích thước' />
            </Form.Item>
          </Col>

          <Col span={8} className='mb-[24px] px-3'>
            <Form.Item
              name='tenSp'
              label='Giảm giá'
              rules={[{ required: true, message: 'Giảm giá là bắt buộc' }]}
            >
              <InputCurrency placeholder='Nhập giảm giá' max={100} addonAfter='%' />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AddProduct;
