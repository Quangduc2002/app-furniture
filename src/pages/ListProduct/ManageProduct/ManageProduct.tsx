import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from '../index.module.scss';
import { Icon } from '@/components/UI/IconFont/Icon';
import Button from '@/components/UI/Button/Button';
import { Col, Form, Row } from 'antd';
import Text from '@/components/UI/Text';
import InputText from '@/components/UI/InputText';
import SelectCustom from '@/components/UI/SelectCustom';
import { useRequest, useUpdateEffect } from 'ahooks';
import {
  serviceAddProduct,
  serviceEditProduct,
  serviceMeterial,
  serviceProductType,
} from '../service';
import InputCurrency from '@/components/UI/InputCurrency/InputCurrency';
import UploadImage from '@/components/UploadImage/UploadImage';
import { useImageUpload } from '@/utils/FireBase';
import { toast } from '@/components/UI/Toast/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import { serviceGetProductDetail } from '@/pages/ProductDetailPage/service';

function ManageProduct() {
  const { data: dataMeterial } = useRequest(serviceMeterial);
  const { data: dataProductType } = useRequest(serviceProductType);
  const { loading, uploadImage } = useImageUpload();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [disable, setDisabled] = useState<boolean>(true);
  const allValues = Form.useWatch([], form);
  const { action, id } = useParams();
  useUpdateEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setDisabled(false);
      },
      (error) => {
        if (error?.errorFields?.length > 0) {
          setDisabled(true);
        }
      },
    );
  }, [allValues]);

  const selectMeterial = useMemo(() => {
    return dataMeterial?.data?.map((item: any) => {
      return {
        label: item?.tenChatLieu,
        value: item?.id,
      };
    });
  }, [dataMeterial?.data]);

  const selectProductType = useMemo(() => {
    return dataProductType?.data?.map((item: any) => {
      return {
        label: item?.tenLoaiSp,
        value: item?.id,
      };
    });
  }, [dataProductType?.data]);

  const requestAddProduct = useRequest(serviceAddProduct, {
    manual: true,
    onSuccess: () => {
      toast.success('Thêm sản phẩm thành công !');
      form.resetFields();
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  const requestEditProduct = useRequest(serviceEditProduct, {
    manual: true,
    onSuccess: () => {
      toast.success('Sửa sản phẩm thành công !');
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  const onSubmit = async (values: any) => {
    requestEditProduct.loading === true;
    const file = values.image.file;
    let dataImage = null;
    if (file) {
      dataImage = await uploadImage(file);
    }

    const data: any = {
      tenSp: values.tenSp,
      giaBan: values.giaBan,
      giaNhap: values.giaNhap,
      giamGia: values.giamGia,
      kichThuoc: values.kichThuoc,
      producttypeId: values.producttypeId,
      soLuong: values.soLuong,
      chatLieu: values.chatLieu,
      image: dataImage ? dataImage : values.image,
      trangThai: 1,
    };
    if (action === 'update') {
      requestEditProduct.run(id, data);
    } else {
      requestAddProduct.run(data);
    }
  };

  const { data: productDetail, run: runProductDtails } = useRequest(serviceGetProductDetail, {
    manual: true,
  });

  useEffect(() => {
    if (id) {
      runProductDtails(id);
    }
  }, [id]);

  useEffect(() => {
    if (productDetail) {
      form.setFieldsValue({
        tenSp: productDetail?.data.tenSp,
        giaBan: productDetail?.data.giaBan,
        giaNhap: productDetail?.data.giaNhap,
        giamGia: productDetail?.data.giamGia,
        kichThuoc: productDetail?.data.kichThuoc,
        producttypeId: productDetail?.data.producttypeId,
        soLuong: productDetail?.data.soLuong,
        image: productDetail?.data?.image,
        chatLieu: productDetail?.data?.chatLieu,
      });
    }
  }, [productDetail?.data]);

  return (
    <Form
      layout='vertical'
      form={form}
      onFinish={onSubmit}
      className={clsx(styles.listProduct, 'xs:w-full')}
    >
      <div className={clsx(styles.listProduct_header, 'flex-wrap')}>
        <div className='flex items-center gap-4 w-max'>
          <Icon
            onClick={() => navigate(ROUTE_PATH.MANAGEPRODUCT)}
            icon='icon-arrow-left'
            className='text-[24px] cursor-pointer'
          />
          {action === 'new' ? (
            <span className='text-xl font-bold'>Thêm sản phẩm</span>
          ) : (
            <span className='text-xl font-bold'>Sửa sản phẩm</span>
          )}
        </div>
        <div className='flex gap-4'>
          <Button
            onClick={() => navigate(ROUTE_PATH.MANAGEPRODUCT)}
            className='w-[100px] !py-3'
            type='xhome-purple-negative-secondary'
          >
            Hủy
          </Button>
          <Button
            htmlType='submit'
            disabled={disable}
            loading={requestAddProduct?.loading || requestEditProduct?.loading || loading}
            className='w-[100px] !py-3'
            type='xhome-negative-primary'
          >
            <Text element='span'>Xác nhận</Text>
          </Button>
        </div>
      </div>

      <>
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
              name='chatLieu'
              label='Chất liệu'
              rules={[{ required: true, message: 'Chất liệu là bắt buộc' }]}
            >
              <SelectCustom placeholder='Chọn chất liệu' options={selectMeterial} allowClear />
            </Form.Item>
          </Col>

          <Col span={12} className='mb-[24px] px-3'>
            <Form.Item
              name='producttypeId'
              label='Loại phòng'
              rules={[{ required: true, message: 'Chọn loại phòng là bắt buộc' }]}
            >
              <SelectCustom placeholder='Chọn loại phòng' options={selectProductType} allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Row wrap={false}>
          <Col span={12} className='mb-[24px] px-3'>
            <Form.Item
              name='giaNhap'
              label='Giá nhập'
              rules={[{ required: true, message: 'Giá nhập là bắt buộc' }]}
            >
              <InputCurrency placeholder='Nhập giá nhập' addonAfter='Đồng' />
            </Form.Item>
          </Col>

          <Col span={12} className='mb-[24px] px-3'>
            <Form.Item
              name='giaBan'
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
              name='soLuong'
              label='Số lượng'
              rules={[{ required: true, message: 'Số lượng là bắt buộc' }]}
            >
              <InputCurrency placeholder='Nhập số lượng' />
            </Form.Item>
          </Col>

          <Col span={8} className='mb-[24px] px-3'>
            <Form.Item
              name='kichThuoc'
              label='Kích thước'
              rules={[{ required: true, message: 'Kích thước là bắt buộc' }]}
            >
              <InputText placeholder='Nhập kích thước' />
            </Form.Item>
          </Col>

          <Col span={8} className='mb-[24px] px-3'>
            <Form.Item
              name='giamGia'
              label='Giảm giá'
              rules={[{ required: true, message: 'Giảm giá là bắt buộc' }]}
            >
              <InputCurrency placeholder='Nhập giảm giá' max={100} addonAfter='%' />
            </Form.Item>
          </Col>
        </Row>

        <Col span={12} className='mb-[24px] px-3'>
          <Form.Item
            name='image'
            label='Ảnh sản phẩm'
            rules={[{ required: true, message: 'Ảnh sản phẩm là bắt buộc' }]}
          >
            <UploadImage description='(kích cỡ tối ưu, 794x540px)' width={397} height={270} />
          </Form.Item>
        </Col>
      </>
    </Form>
  );
}

export default ManageProduct;
