import { useState } from 'react';
import clsx from 'clsx';
import styles from './Home.module.scss';
import { Icon } from '@/components/UI/IconFont/Icon';
import Filter from '../../components/Filter/Filter';

interface HomeSearchProps {
  product: any;
  setPageSize: any;
  setMinPrice: any;
  setMaxPrice: any;
  isCheckedMaterial: any;
  setIsCheckedMaterial: any;
  ratings: any;
  setRatings: any;
  setDiscount: any;
  discount: any;
  searchs: string;
  setSearchs: any;
  isActivePrice: number;
  setIsActivePrice: any;
}

function HomeSearch({
  product,
  setPageSize,
  setMinPrice,
  setMaxPrice,
  isCheckedMaterial,
  setIsCheckedMaterial,
  ratings,
  setRatings,
  setDiscount,
  discount,
  searchs,
  setSearchs,
  isActivePrice,
  setIsActivePrice,
}: HomeSearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const show = (value: string) => {
    if (value === 'search') {
      setShowSearch(!showSearch);
      setShowFilters(false);
    } else if (value === 'filter') {
      setShowFilters(!showFilters);
      setShowSearch(false);
    }
  };

  return (
    <div className='mb-[40px]'>
      <div className={clsx(styles.home_title)}>
        <h2 className='text-2xl'>Dòng sản phẩm nổi bật</h2>
        <ul>
          <li>
            <label>Hiển thị: </label>
            <select
              className={clsx(styles.home_title__show)}
              onChange={(e) => setPageSize(e.target.value)}
              defaultValue={0}
            >
              <option value={0} disabled className='hidden'>
                Mặc định
              </option>
              <option value={product?.length}>Tất cả</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </li>

          <div className='flex'>
            <li
              value='filter'
              className={clsx(
                styles.filter,
                showFilters ? styles.showFilter : '',
                'flex gap-1 items-center',
              )}
              onClick={() => show('filter')}
            >
              <Icon icon='icon-filter' />
              <span>Lọc</span>
            </li>
          </div>
        </ul>
      </div>

      {showFilters && (
        <Filter
          isCheckedMaterial={isCheckedMaterial}
          setIsCheckedMaterial={setIsCheckedMaterial}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setDiscount={setDiscount}
          discount={discount}
          ratings={ratings}
          setRatings={setRatings}
          isActivePrice={isActivePrice}
          setIsActivePrice={setIsActivePrice}
        />
      )}
    </div>
  );
}

export default HomeSearch;
