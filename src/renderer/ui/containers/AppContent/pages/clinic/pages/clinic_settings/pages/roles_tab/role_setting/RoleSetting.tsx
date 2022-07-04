import { members, roles, selectedRole as defaultSelected } from '@api/fake';
import TabMenu from '@components/tab_menu';
import { RolePermissions } from '@models/server.models';
import { useSearchParams } from 'react-router-dom';
import PermissionList from './miniTabs/permission_list';
import RoleSettingGeneral from './miniTabs/role_setting_general';
import RoleSettingMembers from './miniTabs/role_setting_members';
import './style/index.scss';

interface RoleSettingProps {}
export default function RoleSetting({}: RoleSettingProps) {
  const [searchParams] = useSearchParams();
  //REDUX fetch selected role
  const roleIdParam = searchParams.get('roleId')
    ? searchParams.get('roleId')
    : defaultSelected.roleId;
  const { roleName, linkedRole, rolePermissions, roleDesc } = roles.filter(
    ({ roleId }) => roleId.toString() == roleIdParam,
  )[0];

  return (
    <div className="role-setting">
      <TabMenu items={['General', 'Permissions', 'Members']}>
        <RoleSettingGeneral {...{ roleName, roleDesc, linkedRole }} />
        <PermissionList permissions={rolePermissions as RolePermissions} />
        <RoleSettingMembers
          list={members.filter(
            ({ roles: memberRoles }) =>
              memberRoles.find(
                ({ roleId: id }) => id.toString() == roleIdParam,
              ) != undefined,
          )}
        />
      </TabMenu>
    </div>
  );
}
