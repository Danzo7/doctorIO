import color from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import LoadingSpinner from '@components/loading_spinner';
import TabMenu from '@components/tab_menu';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import { mapIndexFromPermissions } from '@helpers/permission.helper';
import usePrompt from '@libs/HistoryBlocker';
import roleApi, {
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
} from '@redux/clinic/rbac/role/roleApi';
import { setRoleSettings } from '@redux/clinic/rbac/role/roleSettingSlice';
import store, { useAppDispatch, useAppSelector } from '@store';
import { useSearchParams } from 'react-router-dom';
import PermissionList from './miniTabs/permission_list';
import RoleSettingGeneral from './miniTabs/role_setting_general';
import RoleSettingMembers from './miniTabs/role_setting_members';
import './style/index.scss';

interface RoleSettingProps {}
export default function RoleSetting({}: RoleSettingProps) {
  const [searchParams] = useSearchParams();
  const roleIdParam = searchParams.get('roleId');
  const { name, description, permissions, isDirty } = useAppSelector(
    (state) => state.roleSettingSlice,
  );
  const { data, isFetching, isLoading, isSuccess, error, refetch } =
    useGetRoleByIdQuery(Number(roleIdParam) as any, {
      skip: roleIdParam == undefined,
    });

  const [UpdateRole] = useUpdateRoleMutation();
  const roleByIdQuery = roleApi.endpoints.getRoleById.useQueryState(
    Number(roleIdParam),
  );

  console.log('dirty', isDirty);
  const dispatch = useAppDispatch();
  usePrompt(
    'Careful : you have unsaved changes !',
    ({ closeOverlay, dismiss }) => (
      <SnakeBarActionsControls>
        <TextButton
          text="reset"
          afterBgColor={color.darker}
          onPress={() => {
            refetch();
            dispatch(
              setRoleSettings({
                name: roleByIdQuery.data?.name,
                description: roleByIdQuery.data?.description,
                permissions: roleByIdQuery.data?.permissions,
                isDirty: false,
              }),
            );
            closeOverlay();
            dismiss();
          }}
        />
        <TextButton
          text="Save changes"
          backgroundColor={color.good_green}
          onPress={() => {
            // console.log()
            const rolefromState = store.getState().roleSettingSlice;
            UpdateRole({
              id: Number(roleIdParam),
              body: {
                name: rolefromState.name,
                description: rolefromState.description,
                permissions: mapIndexFromPermissions(
                  rolefromState.permissions ?? [],
                ),
              },
            });

            closeOverlay();
            dismiss();
          }}
        />
      </SnakeBarActionsControls>
    ),
    isDirty,
    true,
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
