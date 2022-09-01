import { PermKeys } from '@models/server.models';

export const isAllowed = (permKey: PermKeys, permissions: PermKeys[]) => {
  return (
    permissions.includes('CAN_HAVE_ADMIN') || permissions.includes(permKey)
  );
};
