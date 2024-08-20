import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Component/Sidebar/Sidebar';

const AdminLayout = () => {
  return (
    <Suspense fallback={undefined}>
      <div className='flex absolute justify-between overflow-hidden top-0 right-0 bottom-0 left-0 xs:p-0 md:p-4 bg-slate-100'>
        <Sidebar />
        <div className='w-[calc(100%-280px)] overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
};

export default AdminLayout;
