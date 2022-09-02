import color from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import { mapIndexFromPermissions } from '@helpers/permission.helper';
import usePrompt from '@libs/HistoryBlocker';
import roleApi, {
  useGetRoleByIdQuery,
  useLazyGetRoleByIdQuery,
  useUpdateRoleMutation,
} from '@redux/clinic/rbac/role/roleApi';
import { setRoleSettings } from '@redux/clinic/rbac/role/roleSettingSlice';
import { useAppDispatch, useAppSelector } from '@store';
import { useSearchParams } from 'react-router-dom';
import RoleList from './role_list';
import RoleSetting from './role_setting';
import './style/index.scss';
interface RolesTabProps {}

export default function RolesTab({}: RolesTabProps) {
  const roleSettings = useAppSelector((state) => state.roleSettingSlice);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const roleIdParam = searchParams.get('roleId');

  const {
    data,
    currentData,
    isFetching,
    isLoading,
    isSuccess,
    error,
    refetch,
    isError,
  } = useGetRoleByIdQuery(Number(roleIdParam) as any, {});

  const [UpdateRole] = useUpdateRoleMutation();
  usePrompt(
    'Careful : you have unsaved changes !',
    ({ closeOverlay, dismiss }) => (
      <SnakeBarActionsControls>
        <TextButton
          text="reset"
          afterBgColor={color.darker}
          onPress={() => {
            refetch();

            closeOverlay();
            dismiss();
          }}
        />
        <TextButton
          text="Save changes"
          backgroundColor={color.good_green}
          onPress={() => {
            UpdateRole({
              id: Number(roleIdParam),
              body: {
                name: roleSettings.name,
                description: roleSettings.description,
                permissions: mapIndexFromPermissions(
                  roleSettings.permissions ?? [],
                ),
              },
            });

            closeOverlay();
            dismiss();
          }}
        />
      </SnakeBarActionsControls>
    ),
    roleSettings.isDirty,
    true,
  );
  console.log('dirty', roleSettings.isDirty);
  return (
    <div className="roles-tab">
      <RoleList />
      <RoleSetting />
    </div>
  );
}
