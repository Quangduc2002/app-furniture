import React, { forwardRef } from 'react';

import { InputNumber, InputNumberProps } from 'antd';
import classNames from 'classnames';

import styles from './index.module.scss';

interface IPropsInputCurrency extends InputNumberProps {
  placeholder?: string;
  className?: string;
  addonAfter?: React.ReactNode;
  max?: any;
}

const InputCurrency = (props: IPropsInputCurrency, ref?: any) => {
  const { className = '', placeholder, addonAfter, max, ...rest } = props;

  const handleKeyDown = (e: any) => {
    if (
      /^\d+$/.test(e.key) ||
      e.key === 'Backspace' ||
      (e.ctrlKey && e.key === 'a') ||
      (e.ctrlKey && e.key === 'c')
    ) {
      return;
    }
    e.preventDefault();
  };

  return (
    <InputNumber
      className={classNames(styles.inputCurrency, {
        [className]: !!className,
      })}
      placeholder={placeholder}
      addonAfter={addonAfter}
      precision={1}
      min={0}
      max={max}
      formatter={(value: any) => {
        if (max && parseInt(value) >= max) {
          return max;
        }
        return `${value}`.replaceAll(/\B(?=(\d{3})+(?!\d))/g, '․');
      }}
      controls={false}
      keyboard={false}
      ref={ref}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
      {...rest}
    />
  );
};

export default forwardRef(InputCurrency);
