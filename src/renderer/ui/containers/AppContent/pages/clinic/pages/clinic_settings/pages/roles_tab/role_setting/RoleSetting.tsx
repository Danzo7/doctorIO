import TabMenu, { NavTabMenu } from '@components/tab_menu';
import { Outlet, Route, Routes } from 'react-router-dom';
import PermissionList from './miniTabs/permission_list';
import RoleSettingGeneral from './miniTabs/role_setting_general';
import RoleSettingMembers from './miniTabs/role_setting_members';
import './style/index.scss';

const permissionArray = [
  {
    permissionName: 'administrator',
    permissionDescription: 'Can access to database and edit clinic information',
    disabled: true,
  },
  {
    permissionName: 'Assistant',
    permissionDescription:
      '   people with this role will assist another role, mean they can only access to the dependent role permission',
    linkedPermission: ' @Rythm#3722',
  },
  {
    permissionName: 'Access to patients List',
    permissionDescription: 'This is an example permission',
  },
  {
    permissionName: 'Assistant',
    permissionDescription:
      '   people with this role will assist another role, mean they can only access to the dependent role permission',
    linkedPermission: ' @Rythm#3722',
  },
  {
    permissionName: 'Add patients',
    permissionDescription: '  This is an example permission',
  },
  {
    permissionName: 'Edit patients data',
    permissionDescription: ' This is an example permission',
  },
  {
    permissionName: 'Edit patients data',
    permissionDescription: ' This is an example permission',
  },
  {
    permissionName: 'Edit patients data',
    permissionDescription: ' This is an example permission',
  },
  {
    permissionName: 'Edit patients data',
    permissionDescription: ' This is an example permission',
  },
];

interface RoleSettingProps {}
export default function RoleSetting({}: RoleSettingProps) {
  return (
    <div className="role-setting">
      <NavTabMenu
        items={[
          { name: 'General', route: { to: '', include: 'General' } },
          'Permissions',
          'Members',
        ]}
      />
      <Routes>
        <Route path="" element={<RoleSettingGeneral />} />
        <Route path="General" element={<RoleSettingGeneral />} />
        <Route
          path="Permissions"
          element={<PermissionList permissionArray={permissionArray} />}
        />
        <Route path="Members" element={<RoleSettingMembers />} />
      </Routes>
    </div>
  );
}
