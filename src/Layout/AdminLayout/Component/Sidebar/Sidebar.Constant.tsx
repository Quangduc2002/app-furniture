import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import { ROUTE_PATH } from '@/routes/route.constant';
import { userDefault } from '@/store/Login/type';
import { TRole, useRole } from '@/store/Role/useRole';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
type TRouteSidebar = Array<{
  key: string;
  label: JSX.Element;
  href?: string;
  icon?: JSX.Element;
  children?: any;
  role?: TRole | TRole[];
}>;

export const RouteSidebar = () => {
  const [user] = useAtom(userDefault);

  const ROUTE_SIDEBAR: TRouteSidebar = [
    {
      key: '1',
      label: (
        <div>
          <Text type='title1-semi-bold'>{user?.account?.getUser?.name}</Text>
          <Text type='body2' color='neutral-300'>
            {user?.account?.roles?.name}
          </Text>
        </div>
      ),
      icon: (
        <img src={user?.account?.getUser?.image} alt='icon' className='w-10 h-10 rounded-full' />
      ),
      href: '#',
      role: ['ADMIN', 'MANAGEMENT_BOARD'],
    },
    {
      key: '2',
      label: <Text>Trang</Text>,
      icon: <Icon icon='icon-image' className='!text-[24px] !text-white' />,
      children: [
        {
          key: '2-1',
          label: 'Thống kê doanh thu',
          href: ROUTE_PATH.REVENUA,
          role: ['ADMIN', 'MANAGEMENT_BOARD'],
        },
        {
          key: '2-2',
          label: 'Quản lý sản phẩm',
          href: ROUTE_PATH.MANAGEPRODUCT,
          role: ['ADMIN', 'MANAGEMENT_BOARD'],
        },
        // {
        //   key: '2-3',
        //   label: 'Quản lý nhân viên',
        //   href: ROUTE_PATH.HOME,
        //   role: ['ADMIN', 'MANAGEMENT_BOARD'],
        // },
        {
          key: '2-4',
          label: 'Quản lý khách hàng',
          href: ROUTE_PATH.MANAGECUSTOMER,
          role: ['ADMIN', 'MANAGEMENT_BOARD'],
        },
        {
          key: '2-5',
          label: 'Chất liệu',
          href: ROUTE_PATH.MATERIAL,
          role: ['ADMIN', 'MANAGEMENT_BOARD'],
        },
        {
          key: '2-6',
          label: 'Thùng rác',
          href: ROUTE_PATH.TRASHPRODUCT,
          role: ['ADMIN'],
        },
      ],
    },
    {
      key: '3',
      label: <Text>Quản lý đơn hàng</Text>,
      icon: <Icon icon='icon-clip-board' className='!text-[24px] !text-white' />,
      children: [
        {
          key: '3-1',
          label: 'Danh sách đơn hàng',
          href: ROUTE_PATH.LISTORDERPRODUCT,
          role: ['ADMIN', 'MANAGEMENT_BOARD'],
        },
        {
          key: '3-2',
          label: 'Chi tiết đơn hàng',
          href: ROUTE_PATH.LISTORDERPRODUCTDETAILS,
          role: ['ADMIN', 'MANAGEMENT_BOARD'],
        },
      ],
    },
  ];

  return { ROUTE_SIDEBAR };
};

export const generateMenuItems = (items: any) => {
  const { checkRole } = useRole();
  return items
    .map((item: any) => {
      if (item.children) {
        return {
          key: item.key,
          label: item.label,
          icon: item.icon,
          href: item.href,
          children: generateMenuItems(item.children),
        };
      }

      if (checkRole(item.role)) {
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
      }

      return undefined;
    })
    .filter(Boolean);
};
