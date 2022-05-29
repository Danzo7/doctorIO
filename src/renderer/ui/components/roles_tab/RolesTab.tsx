import RoleList from './role_list';
import RoleSetting from './role_setting';
import './style/index.scss';
interface RolesTabProps {
  roleList?: any[];
  permissionArray?: any[];
}

export default function RolesTab({
  roleList = [
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Support', linked: '@doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Support', linked: '@doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Support', linked: '@doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
  ],
}: RolesTabProps) {
  return (
    <div className="roles-tab">
      <RoleList roleList={roleList} height="100%" />
      <RoleSetting />
    </div>
  );
}
