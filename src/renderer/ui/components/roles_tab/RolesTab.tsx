import RoleList from '@components/role_list';
import React from 'react';
import RoleSetting from './role_setting';
import './style/index.scss';
interface RolesTabProps {
  roleList: any[];
  permissionArray: any[];
}
export default function RolesTab({ roleList, permissionArray }: RolesTabProps) {
  return (
    <div className="roles-tab">
      <RoleList roleList={roleList} height="100%" />
      <RoleSetting permissionArray={permissionArray} />
    </div>
  );
}
