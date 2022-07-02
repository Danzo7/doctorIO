import { PermKeys, RolePermissions } from '@models/server.models';

export const isAllowed = (permKey: PermKeys, permissions: RolePermissions) => {
  return permissions.isAdmin || permissions[permKey];
};
