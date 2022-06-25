import TabMenu, { NavTabMenu } from '@components/tab_menu';
import { PERMISSIONS } from '@constants/permissions';
import { Outlet, Route, Routes } from 'react-router-dom';
import PermissionList from './miniTabs/permission_list';
import RoleSettingGeneral from './miniTabs/role_setting_general';
import RoleSettingMembers from './miniTabs/role_setting_members';
import './style/index.scss';

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
          element={<PermissionList list={PERMISSIONS} />}
        />
        <Route path="Members" element={<RoleSettingMembers />} />
      </Routes>
    </div>
  );
}
