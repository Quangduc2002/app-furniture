import React from 'react';

import { Icon } from '@/components/UI/IconFont/Icon';
import { ROUTE_PATH } from '@/routes/route.constant';

type TRouteSidebar = Array<{
  id: string;
  title: string;
  href: string;
  icon?: () => any;
}>;

export const ROUTE_HEADER: TRouteSidebar = [
  {
    id: 'sub1',
    title: 'Trang chủ',
    href: ROUTE_PATH.HOME,
  },
  {
    id: 'sub2',
    title: 'Phòng khách',
    href: ROUTE_PATH.LIVINGROOM,
  },
  {
    id: 'sub3',
    title: 'Phòng bếp',
    href: ROUTE_PATH.KETCHEN,
  },
  {
    id: 'sub4',
    title: 'Phòng làm việc',
    href: ROUTE_PATH.WORKROOM,
  },
  {
    id: 'sub5',
    title: 'Phòng ngủ',
    href: ROUTE_PATH.BEDROOM,
  },
];

export const ROUTE_HEADER_PROFILE: TRouteSidebar = [
  {
    id: 'personal',
    title: 'Hồ sơ cá nhân',
    href: ROUTE_PATH.PROFILE,
    icon: () => <Icon icon='icon-user' className='text-[24px]' />,
  },
  {
    id: 'purchaseOrder',
    title: 'Đơn mua',
    href: ROUTE_PATH.LISTORDER,
    icon: () => <Icon icon='icon-clip-board' className='text-[24px]' />,
  },
];
