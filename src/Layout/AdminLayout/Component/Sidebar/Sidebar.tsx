import clsx from 'clsx';
const { Sider } = Layout;
import useLogout from '@/store/Logout/Logout';
import { Layout, Menu } from 'antd';
import { Icon } from '@/components/UI/IconFont/Icon';
import { generateMenuItems, RouteSidebar } from './Sidebar.Constant';
import Button from '@/components/UI/Button/Button';
import styles from './Sidebar.module.scss';
import { getActiveKey } from '@/utils/ActiveKey';
function Sidebar() {
  const { logoutUser } = useLogout();
  const handleLogOutUser = () => {
    logoutUser();
  };
  const { ROUTE_SIDEBAR } = RouteSidebar();
  const items = generateMenuItems(ROUTE_SIDEBAR);
  const activeKey = getActiveKey(location.pathname, items);

  return (
    <Layout className={clsx('!w-[280px] !max-w-[280px] text-white')}>
      <Sider className='rounded-tl-[16px] rounded-bl-[16px]'>
        <div className='demo-logo-vertical'>
          <div className={clsx(styles.sidebar_img)}>
            <img
              className='m-auto'
              style={{ width: 100, height: 100 }}
              src={`/Images/Logo.png`}
              alt=''
            />
          </div>
        </div>

        <Menu mode='inline' items={items} selectedKeys={[activeKey]} />

        <Button
          onClick={handleLogOutUser}
          className='flex items-center gap-2 h-[40px] px-[24px] w-full'
        >
          <Icon className='!text-[24px] !text-white' icon='icon-logout' />
          <span>Đăng xuất</span>
        </Button>
      </Sider>
    </Layout>
  );
}

export default Sidebar;
