import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../UI/IconFont/Icon';

function Bars({ setMenu, menu }: any) {
  return (
    <div className='flex justify-between items-center mb-10 px-[16px]  h-[44px]'>
      <div>
        <Link className='text-gray-500' to='/'>
          Trang
        </Link>
        <span className='mx-2 text-gray-500'>/</span>
        <span className='text-indigo-950 text-xl font-bold'>Thống kê</span>
      </div>

      <div>
        {menu === true ? (
          <i
            onClick={() => setMenu(false)}
            className='fa-solid fa-xmark text-2xl md:hidden xs:block'
          ></i>
        ) : (
          <i
            onClick={() => setMenu(true)}
            className='fa-solid fa-bars text-2xl md:hidden xs:block'
          ></i>
        )}
      </div>
    </div>
  );
}

export default Bars;
