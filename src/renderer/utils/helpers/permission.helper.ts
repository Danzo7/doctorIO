import { PermKeys, permList } from '@models/server.models';

export const isAllowed = (permKey: PermKeys, permissions: PermKeys[]) => {
  return (
    permissions.includes('CAN_HAVE_ADMIN') || permissions.includes(permKey)
  );
};
export function mapPermissionsFromNumbers(perms: number[]): PermKeys[] {
  return [...perms.map((n) => permList[n])];
}
export function mapIndexFromPermissions(perms: PermKeys[]): number[] {
  return [...perms.map((n) => permList.indexOf(n))];
}
