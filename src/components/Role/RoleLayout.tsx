import { userDefault } from '@/store/Login/type';
import { TRole, useRole } from '@/store/Role/useRole';
import { useAtom } from 'jotai';
import React from 'react';
import { Navigate } from 'react-router-dom';
interface IPropsRoleLayout {
  children: React.ReactNode;
  role: TRole | TRole[];
}
function RoleLayout({ children, role }: IPropsRoleLayout) {
  const [user] = useAtom(userDefault);
  const { checkRole } = useRole();
  if (!checkRole(role)) {
    return <Navigate to={'/admin/thong-ke'} />;
  }

  if (!user?.isAuthenticated || user?.account?.roles?.role === 'USER') {
    return <></>;
  }

  return <>{children}</>;
}

export default RoleLayout;
