import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from 'common/contexts';
import { UserRole } from 'common/model';

interface CheckRoleProps {
  roles: UserRole[];
  children: JSX.Element;
}

export const CheckRole = ({ roles, children }: CheckRoleProps) => {
  const { user, isGuest } = useContext(UserContext);

  if (
    (isGuest && !roles.includes(UserRole.GUEST)) ||
    (user && !roles.includes(user.roles))
  ) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};
