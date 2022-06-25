import RoleList from './role_list';
import RoleSetting from './role_setting';
import './style/index.scss';
interface RolesTabProps {}

export default function RolesTab({}: RolesTabProps) {
  return (
    <div className="roles-tab">
      <RoleList height="100%" />
      <RoleSetting />
    </div>
  );
}
