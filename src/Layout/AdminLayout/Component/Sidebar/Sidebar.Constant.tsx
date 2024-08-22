import { Icon } from '@/components/UI/IconFont/Icon';
import { ROUTE_PATH } from '@/routes/route.constant';
import { userDefault } from '@/store/Login/type';
import { icons } from 'antd/es/image/PreviewGroup';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
type TRouteSidebar = Array<{
  key: string;
  label: string;
  href?: string;
  icon?: JSX.Element;
  children?: any;
}>;

export const RouteSidebar = () => {
  const [user] = useAtom(userDefault);

  const ROUTE_SIDEBAR: TRouteSidebar = [
    {
      key: '1',
      label: `${user?.account?.getUser?.name}`,
      icon: (
        <img src={user?.account?.getUser?.image} alt='icon' className='w-10 h-10 rounded-full' />
      ),
      children: [
        {
          key: '1-1',
          label: 'Thông tin của tôi',
          href: ROUTE_PATH.HOME,
        },
        {
          key: '1-2',
          label: 'Cài đặt',
          href: ROUTE_PATH.HOME,
        },
      ],
    },
    {
      key: '2',
      label: 'Trang',
      icon: <Icon icon='icon-image' className='!text-[24px] !text-white' />,
      children: [
        {
          key: '2-1',
          label: 'Thống kê doanh thu',
          href: ROUTE_PATH.REVENUA,
        },
        {
          key: '2-2',
          label: 'Quản lý sản phẩm',
          href: ROUTE_PATH.MANAGEPRODUCT,
        },
        {
          key: '2-3',
          label: 'Thêm người dùng',
          href: ROUTE_PATH.HOME,
        },
        {
          key: '2-4',
          label: 'Quản lý người dùng',
          href: ROUTE_PATH.HOME,
        },
        {
          key: '2-5',
          label: 'Thùng rác',
          href: ROUTE_PATH.TRASHPRODUCT,
        },
      ],
    },
    {
      key: '3',
      label: 'Quản lý đơn hàng',
      icon: <Icon icon='icon-clip-board' className='!text-[24px] !text-white' />,
      children: [
        {
          key: '3-1',
          label: 'Danh sách đơn hàng',
          href: ROUTE_PATH.LISTORDERPRODUCT,
        },
        {
          key: '3-2',
          label: 'Chi tiết đơn hàng',
          href: ROUTE_PATH.HOME,
        },
      ],
    },
  ];

  return { ROUTE_SIDEBAR };
};

export const generateMenuItems = (items: any) => {
  return items.map((item: any) => {
    if (item.children) {
      return {
        key: item.key,
        label: item.label,
        icon: item.icon,
        href: item.href,
        children: generateMenuItems(item.children),
      };
    }
    return {
      key: item.key,
      label: (
        <Link to={item.href}>
          {item.label} <Icon icon={item.icon} />
        </Link>
      ),
      href: item.href,
      icon: item.icon,
    };
  });
};
