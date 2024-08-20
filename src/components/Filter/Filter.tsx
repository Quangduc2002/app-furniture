import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Filter.module.scss';
import { useRequest } from 'ahooks';
import { serviceGetAllMeterial } from '../../pages/HomePage/service';
import { stars } from '@/utils/Stars';
interface FilterProps {
  setMinPrice: any;
  setMaxPrice: any;
  isCheckedMaterial: any;
  setIsCheckedMaterial: any;
  ratings: any;
  setRatings: any;
  setDiscount: any;
  discount: any;
  isActivePrice: number;
  setIsActivePrice: any;
}
function Filter({
  setMinPrice,
  setMaxPrice,
  isCheckedMaterial,
  setIsCheckedMaterial,
  ratings,
  setRatings,
  setDiscount,
  discount,
  isActivePrice,
  setIsActivePrice,
}: FilterProps) {
  const { data: materials } = useRequest(serviceGetAllMeterial);
  // const stars = [
  //   { id: 1, class: 'star-1' },
  //   { id: 2, class: 'star-2' },
  //   { id: 3, class: 'star-3' },
  //   { id: 4, class: 'star-4' },
  //   { id: 5, class: 'star-5' },
  // ];
  const sortPrices = [
    {
      id: 1,
      value: 'all',
      Content: 'Tất cả',
    },
    {
      id: 2,
      value: '0-10000000',
      Content: '0 đ - 10.000.000 đ',
    },
    {
      id: 3,
      value: '10000000-20000000',
      Content: '10.000.000 đ - 20.000.000 đ',
    },
    {
      id: 4,
      value: '20000000-30000000',
      Content: '20.000.000 đ - 30.000.000 đ',
    },
    {
      id: 5,
      value: '30000000',
      Content: '30.000.000 đ +',
    },
  ];

  const handleFilterByRange = (min: string | number | null, max: string | number | null) => {
    if (!min && !max) {
      setMinPrice('');
      setMaxPrice('');
    } else if (min && !max) {
      setMinPrice(min);
      setMaxPrice('');
    } else {
      setMinPrice(min);
      setMaxPrice(max);
    }
  };

  const handleRadioChange = (value: any) => {
    switch (value) {
      case 'all':
        handleFilterByRange(null, null);
        break;
      case '0-10000000':
        handleFilterByRange(0, 10000000);
        break;
      case '10000000-20000000':
        handleFilterByRange(10000000, 20000000);
        break;
      case '20000000-30000000':
        handleFilterByRange(20000000, 30000000);
        break;
      case '30000000':
        handleFilterByRange(30000000, null);
        break;
      default:
        handleFilterByRange(null, null);
    }
  };

  const handleCheckBoxMaterial = (value: string, checked: boolean) => {
    if (checked) {
      setIsCheckedMaterial([...isCheckedMaterial, parseInt(value)]);
    } else {
      setIsCheckedMaterial(isCheckedMaterial.filter((tenCL: any) => parseInt(value) !== tenCL));
    }
  };

  const handleCheckRadioRatings = (value: any) => {
    if (value && value === ratings) {
      setRatings('');
    } else {
      setRatings(value);
    }
  };

  const deleteAllFilter = () => {
    setIsCheckedMaterial('');
    setMinPrice('');
    setMaxPrice('');
    setDiscount(false);
    setIsActivePrice(1);
    setRatings('');
  };

  return (
    <div className={clsx(styles.panelFilter)}>
      <div className={clsx(styles.panelFilter_container)}>
        <div className={clsx(styles.panelFilter_wrapFilter)}>
          <div className={clsx(styles.panelFilter_wrapFilter__filter)}>
            <div className={clsx(styles.panelFilter_wrapFilter__filter__mtext)}>Đánh giá</div>
            <ul>
              <li>
                {stars.map((star, index) => {
                  return (
                    <div
                      className={clsx(
                        +ratings === star.id ? styles.activeRating : '',
                        styles.comtainerRating,
                      )}
                      key={star.id}
                      onClick={() => handleCheckRadioRatings(star.id)}
                    >
                      <div className='stars-outer' style={{ margin: 0 }}>
                        <div
                          className={clsx(
                            'stars-inner',
                            index + 1 === star.id ? `stars-inner-${index + 1}` : '',
                          )}
                        ></div>
                      </div>
                      &nbsp;&nbsp;
                      <span className={clsx(star.id === 5 ? styles.visibility : '')}>trở lên</span>
                    </div>
                  );
                })}
              </li>
            </ul>
          </div>

          <div className={clsx(styles.panelFilter_wrapFilter__filter)}>
            <div className={clsx(styles.panelFilter_wrapFilter__filter__mtext)}>Chất liệu</div>
            <ul>
              {materials &&
                materials?.data.map((material: any) => {
                  return (
                    <li key={material.id}>
                      <label
                        className={clsx(
                          isCheckedMaterial.includes(material.id) ? styles.sortPrice : '',
                          'flex items-center',
                        )}
                      >
                        <input
                          style={{ width: 16, height: 16 }}
                          checked={isCheckedMaterial.includes(material.id)}
                          type='checkbox'
                          name='materialFilter'
                          value={material.id}
                          onChange={(e) => handleCheckBoxMaterial(e.target.value, e.target.checked)}
                        />
                        &nbsp;&nbsp;
                        {material.tenChatLieu}
                      </label>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className={clsx(styles.panelFilter_wrapFilter__filter)}>
            <div className={clsx(styles.panelFilter_wrapFilter__filter__mtext)}>Giá bán</div>
            <ul>
              {sortPrices.map((sortPrice) => {
                return (
                  <li key={sortPrice.id}>
                    <label className={clsx(sortPrice.id === isActivePrice ? styles.sortPrice : '')}>
                      <input
                        style={{ display: 'none' }}
                        type='radio'
                        name='priceFilter'
                        value={sortPrice.value}
                        onClick={() => setIsActivePrice(sortPrice.id)}
                        onChange={(e) => handleRadioChange(e.target.value)}
                      />
                      {sortPrice.Content}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={clsx(styles.panelFilter_wrapFilter__filter)}>
            <div className={clsx(styles.panelFilter_wrapFilter__filter__mtext)}>
              Dịch Vụ & Khuyến Mãi
            </div>
            <ul>
              <li>
                <label className={clsx(discount ? styles.sortPrice : '', 'flex items-center')}>
                  <input
                    style={{ width: 16, height: 16 }}
                    value={'discount'}
                    type='checkbox'
                    checked={discount}
                    name='materialFilter'
                    onChange={(e) => setDiscount(e.target.checked)}
                  />
                  &nbsp;&nbsp;Đang giảm giá
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className={clsx(styles.filters)}>
          <button onClick={deleteAllFilter} className={clsx(styles.filters_btn)}>
            Xóa tất cả
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
