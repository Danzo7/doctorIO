import TabMenu from '@components/tab_menu';
import PermissionList from './permission_list';
import './style/index.scss';
interface RoleSettingProps {
  permissionArray: any[];
}
export default function RoleSetting({ permissionArray }: RoleSettingProps) {
  return (
    <div className="role-setting">
      <TabMenu items={['General', 'Permissions', 'Members']} />
      <PermissionList permissionArray={permissionArray} />
    </div>
  );
}
