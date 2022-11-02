import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import LoadingSpinner from '@components/loading_spinner';
import TabMenu from '@components/tab_menu';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import { mapIndexFromPermissions } from '@helpers/permission.helper';
import usePrompt from '@libs/HistoryBlocker';
import { useGetMyPermissionQuery } from '@redux/clinic/rbac/member/memberApi';
import {
  useLazyGetRoleByIdQuery,
  useUpdateRoleMutation,
} from '@redux/clinic/rbac/role/roleApi';
import {
  useIsDirty,
  useRoleSettingStore,
  useSetSettings,
} from '@stores/roleSettingStore';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PermissionList from './miniTabs/permission_list';
import RoleSettingGeneral from './miniTabs/role_setting_general';
import RoleSettingMembers from './miniTabs/role_setting_members';
import './style/index.scss';

interface RoleSettingProps {}
export default function RoleSetting({}: RoleSettingProps) {
  const [searchParams] = useSearchParams();
  const roleIdParam = searchParams.get('roleId');

  const isDirty = useIsDirty();
  const setSettings = useSetSettings();
  const [trigger, { data, isLoading, isSuccess }] = useLazyGetRoleByIdQuery();
  const {
    data: dataL,
    isLoading: isLoadingL,
    isSuccess: isSuccessL,
  } = useGetMyPermissionQuery();
  useEffect(() => {
    trigger(Number(roleIdParam) as any).then((res) => {
      if (res.data) {
        setSettings({
          name: res.data.name,
          description: res.data.description,
          permissions: res.data.permissions,
          defaults: {
            name: res.data.name,
            description: res.data.description,
            permissions: res.data.permissions,
          },
        });
      }
    });
  }, [roleIdParam, setSettings, trigger]);
  const [UpdateRole] = useUpdateRoleMutation();
  usePrompt(
    'Careful : you have unsaved changes !',
    ({ closeOverlay, dismiss }) => (
      <SnakeBarActionsControls>
        <TextButton
          text="reset"
          afterBgColor={color.darker}
          onPress={async () => {
            const defaults = useRoleSettingStore.getState().defaults;
            setSettings({
              name: defaults?.name,
              description: defaults?.description,
              permissions: defaults?.permissions,
              defaults: {
                name: defaults?.name,
                description: defaults?.description,
                permissions: defaults?.permissions ?? [],
              },
            });
            closeOverlay();
            dismiss();
          }}
        />
        <TextButton
          text="Save changes"
          backgroundColor={color.good_green}
          onPress={async () => {
            const state = useRoleSettingStore.getState();
            setSettings({
              defaults: {
                name: state.name,
                description: state.description,
                permissions: state.permissions,
              },
            });
            UpdateRole({
              id: Number(roleIdParam),
              body: {
                name: state.name,
                description: state.description,
                permissions: mapIndexFromPermissions(state.permissions ?? []),
              },
            });

            dismiss();

            closeOverlay();
          }}
        />
      </SnakeBarActionsControls>
    ),
    isDirty,
    isDirty,
  );
  if (roleIdParam == undefined)
    return <div className="role-setting"> choose a role </div>;
  return (
    <div
      className="role-setting"
      css={
        isLoadingL ||
        isLoading ||
        (isSuccessL && isSuccess && data && dataL.lvl > data.priority)
          ? { pointerEvents: 'none', opacity: 0.5 }
          : {}
      }
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        <TabMenu items={['General', 'Permissions', 'Members']}>
          <RoleSettingGeneral
            slaveRole={data?.slaveRole}
            id={Number(roleIdParam)}
          />
          {<PermissionList />}
          <RoleSettingMembers id={Number(roleIdParam)} />
        </TabMenu>
      ) : (
        <div> mafihach </div>
      )}
    </div>
  );
}
