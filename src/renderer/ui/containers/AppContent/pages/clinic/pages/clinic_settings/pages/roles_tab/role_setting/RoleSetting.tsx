import { roles, selectedRole as defaultSelected } from '@api/fake';
import TabMenu, { NavTabMenu } from '@components/tab_menu';
import { RolePermissions } from '@models/server.models';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import PermissionList from './miniTabs/permission_list';
import RoleSettingGeneral from './miniTabs/role_setting_general';
import RoleSettingMembers from './miniTabs/role_setting_members';
import './style/index.scss';

interface RoleSettingProps {}
export default function RoleSetting({}: RoleSettingProps) {
  const [searchParams] = useSearchParams();
  //REDUX fetch selected role
  const { roleName, linkedRole, rolePermissions, roleDesc } =
    roles.filter(
      ({ roleId }) => roleId.toString() == searchParams.get('roleId'),
    )?.[0] ?? defaultSelected;
  return (
    <div className="role-setting">
      <TabMenu items={['General', 'Permissions', 'Members']}>
        <RoleSettingGeneral {...{ roleName, roleDesc, linkedRole }} />
        <PermissionList permissions={rolePermissions as RolePermissions} />
        <RoleSettingMembers />
      </TabMenu>
    </div>
  );
}
