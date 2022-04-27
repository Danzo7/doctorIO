import TabMenu from '@components/tab_menu';
import React from 'react';
import PermissionList from './permission_list';
import './style/index.scss';
interface RoleSettingProps {
  permissionArray: any[];
}
export default function RoleSetting({ permissionArray }: RoleSettingProps) {
  return (
    <div className="role-setting">
      <TabMenu textList={['General', 'Permissions', 'Members']} />
      <div className="content-list">
        <PermissionList permissionArray={permissionArray} />
      </div>
    </div>
  );
}
