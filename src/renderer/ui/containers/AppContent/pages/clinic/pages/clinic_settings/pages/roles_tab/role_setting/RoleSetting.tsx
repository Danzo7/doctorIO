import {
  members as fakeMembers,
  selectedRole as defaultSelected,
  roles as fakeRoles,
} from '@api/fake';
import TabMenu from '@components/tab_menu';
import { useSearchParams } from 'react-router-dom';
import PermissionList from './miniTabs/permission_list';
import RoleSettingGeneral from './miniTabs/role_setting_general';
import RoleSettingMembers from './miniTabs/role_setting_members';
import './style/index.scss';

interface RoleSettingProps {}
export default function RoleSetting({}: RoleSettingProps) {
  const [searchParams] = useSearchParams();
  const roleIdParam = searchParams.get('roleId')
    ? searchParams.get('roleId')
    : defaultSelected.id;
  //REDUX fetch selected role
  //FIXME
  const { name, slaveRole, permissions, description } = fakeRoles.filter(
    ({ id }) => id.toString() == roleIdParam,
  )[0];

  if (!permissions) return <div>NOoooooo</div>;
  return (
    <div className="role-setting">
      <TabMenu items={['General', 'Permissions', 'Members']}>
        <RoleSettingGeneral
          name={name}
          description={description}
          slaveRole={slaveRole}
        />
        {
          <PermissionList permissions={permissions} />
          //FIXME types
        }
        <RoleSettingMembers
          list={fakeMembers.filter(
            ({ roles }) =>
              roles.find(({ id: id }) => id.toString() == roleIdParam) !=
              undefined,
          )}
        />
      </TabMenu>
    </div>
  );
}
