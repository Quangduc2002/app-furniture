import { useAtom } from 'jotai';
import { userDefault } from '../Login/type';

export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGEMENT_BOARD = 'MANAGEMENT_BOARD',
}

export type TRole = keyof typeof ERole;

export const useRole = () => {
  const [user] = useAtom(userDefault);

  const checkRole = (role?: TRole | TRole[]) => {
    if (!user?.isAuthenticated) {
      return;
    }

    if (typeof role === 'object') {
      return role?.includes(user.account.roles.role);
    }

    return user.account.roles.role === role;
  };

  return {
    checkRole,
  };
};
