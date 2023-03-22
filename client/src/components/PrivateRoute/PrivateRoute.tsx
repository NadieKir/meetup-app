import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from 'common/contexts';
import { UserRole } from 'common/model';

export enum UserStatus {
  AUTHORIZED = 'AUTHORIZED',
}

type Role = UserStatus | UserRole;

interface PrivateRouteProps {
  roles: Role[];
  children: JSX.Element;
}

export const PrivateRoute = ({ roles, children }: PrivateRouteProps) => {
  const { user, isGuest } = useContext(UserContext);

  if (
    (isGuest && !roles.includes(UserRole.GUEST)) ||
    (isGuest && roles.includes(UserStatus.AUTHORIZED)) ||
    (user &&
      !roles.some((role) => [user.roles, UserStatus.AUTHORIZED].includes(role)))
  ) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};
