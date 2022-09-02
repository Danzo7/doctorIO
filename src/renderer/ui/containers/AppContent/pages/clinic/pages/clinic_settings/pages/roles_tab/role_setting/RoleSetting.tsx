import LoadingSpinner from '@components/loading_spinner';
import TabMenu from '@components/tab_menu';
import { useGetRoleByIdQuery } from '@redux/clinic/rbac/role/roleApi';
import { useAppSelector } from '@store';
import { useSearchParams } from 'react-router-dom';
import PermissionList from './miniTabs/permission_list';
import RoleSettingGeneral from './miniTabs/role_setting_general';
import RoleSettingMembers from './miniTabs/role_setting_members';
import './style/index.scss';

interface RoleSettingProps {}
export default function RoleSetting({}: RoleSettingProps) {
  const [searchParams] = useSearchParams();
  const roleIdParam = searchParams.get('roleId');
  const { name, description, permissions } = useAppSelector(
    (state) => state.roleSettingSlice,
  );
  const { data, isFetching, isLoading, isSuccess, error } = useGetRoleByIdQuery(
    Number(roleIdParam) as any,
    { skip: roleIdParam == undefined },
  );

  if (roleIdParam == undefined)
    return <div className="role-setting"> nothing </div>;

  return (
    <div className="role-setting">
      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        <TabMenu items={['General', 'Permissions', 'Members']}>
          <RoleSettingGeneral
            name={name ?? data.name}
            description={description ?? data.description}
            slaveRole={data.slaveRole}
          />
          {<PermissionList permissions={permissions ?? data.permissions} />}
          <RoleSettingMembers list={[]} />
        </TabMenu>
      ) : (
        <div> mafihach </div>
      )}
    </div>
  );
}
