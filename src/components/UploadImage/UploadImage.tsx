import { GetProp, Upload, UploadFile, UploadProps, Image } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import Text from '@/components/UI/Text';
import styles from './index.module.scss';
import { Icon } from '../UI/IconFont/Icon';
import { base64ToBlob, beforeUploadImg, checkMb, getBase64, isImage } from '@/utils/image';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface IPropsFormUploadImage {
  value?: any;
  onChange?: any;
  className?: string;
  classNameContent?: string;
  description?: string;
  multiple?: boolean;
  width?: number;
  height?: number;
  max?: number;
  objectFit?: 'contain' | 'cover' | 'fill';
}

interface IPropsItemImage {
  width?: number;
  height?: number;
  value: any;
  onChangeImage?: any;
  onDeleteImage?: any;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
}

const ItemImage = ({
  width = 410,
  height = 222,
  value,
  onChangeImage,
  onDeleteImage,
  className,
  objectFit = 'fill',
}: IPropsItemImage) => {
  return (
    <div
      className={classNames('relative', className)}
      style={{
        width,
        height,
      }}
    >
      <img
        src={value?.url}
        alt=''
        className={classNames('w-full h-full rounded-[8px]', {
          'object-contain': objectFit === 'contain',
          'object-cover': objectFit === 'cover',
          'object-fill': objectFit === 'fill',
        })}
      />
      <div className='absolute right-[12px] top-[12px] flex items-center gap-[12px]'>
        <div className='flex items-center justify-center bg-[var(--background-default)] rounded-[8px] w-[32px] h-[32px] cursor-pointer'>
          <Upload
            accept='.png, .jpg, .jpeg'
            fileList={[]}
            customRequest={() => void 0}
            onChange={onChangeImage}
            beforeUpload={beforeUploadImg}
          >
            <Icon
              icon='icon-upload'
              color='primary-main'
              className='text-[24px] hover:text-[--primary-main]'
            />
          </Upload>
        </div>
        <div
          className='flex items-center justify-center bg-[var(--background-default)] rounded-[8px] w-[32px] h-[32px] cursor-pointer'
          onClick={onDeleteImage}
        >
          <Icon icon='icon-trash-fill' className='text-[24px] hover:text-[--error-main]' />
        </div>
      </div>
    </div>
  );
};

function UploadImage({
  value,
  onChange,
  className = '',
  classNameContent = '',
  description,
  multiple,
  width = 410,
  height = 222,
  max,
  objectFit = 'fill',
}: IPropsFormUploadImage) {
  const onChangeFile = async (file: any) => {
    const isValidMb = checkMb(file?.file);
    if (!isImage(file?.file)) {
      return;
    }

    if (!isValidMb) {
      return;
    }

    const base64 = await getBase64(file?.file?.originFileObj);
    const url = base64ToBlob(base64, file?.file?.type);

    onChange &&
      onChange({
        file: file?.file?.originFileObj,
        url,
      });
  };

  const onChangeSingleImage = async (file: any) => {
    const base64 = await getBase64(file?.file?.originFileObj);
    const url = base64ToBlob(base64, file?.file?.type);

    onChange &&
      onChange({
        file: file?.file?.originFileObj,
        url,
      });
  };

  const onDeleteSingleImage = () => {
    onChange && onChange(undefined);
  };

  return (
    <div>
      {!value && (
        <Upload
          accept='.png, .jpg, .jpeg'
          multiple={multiple}
          fileList={[]}
          customRequest={() => void 0}
          onChange={onChangeFile}
          beforeUpload={beforeUploadImg}
          className={classNames(styles.upload, { [className]: !!className })}
        >
          <div
            className={classNames(
              'flex flex-col justify-center items-center rounded-[8px] border-[1px] border-dashed border-[var(--primary-main)] bg-[var(--primary-50)] cursor-pointer',
              { [classNameContent]: !!classNameContent },
            )}
            style={{
              width,
              height,
            }}
          >
            <div className='flex p-[8px] justify-center items-center gap-[8px] bg-[var(--background-default)] [box-shadow:-20px_20px_80px_-8px_rgba(0,_0,_0,_0.16)] rounded-[100%]'>
              <Icon icon='icon-upload-image-icon' className='text-[24px]' color='primary-main' />
            </div>
            <Text type='title1-semi-bold' color='primary-main'>
              Tải ảnh lên{' '}
              <span className='font-normal text-[var(--text-secondary)]'>hoặc kéo thả tại đây</span>
            </Text>
            <Text type='body2' color='text-secondary' className='mt-[10px] mb-[4px]'>
              PNG, JPG or JPEG
            </Text>
            <Text type='body2' color='text-secondary'>
              {description || '(kích cỡ tối ưu, 924x497px)'}
            </Text>
          </div>
        </Upload>
      )}

      {value && !multiple && (
        <ItemImage
          width={width}
          height={height}
          value={value}
          onChangeImage={onChangeSingleImage}
          onDeleteImage={onDeleteSingleImage}
          objectFit={objectFit}
        />
      )}
    </div>
  );
}

export default UploadImage;
