import { TRole, useRole } from '@/store/Role/useRole';

interface IPropsRoleWrap {
  children: React.ReactNode;
  role: TRole | TRole[];
}

const RoleWrap = ({ children, role }: IPropsRoleWrap) => {
  const { checkRole } = useRole();

  if (!checkRole(role)) {
    return <></>;
  }

  return <>{children}</>;
};

export default RoleWrap;
