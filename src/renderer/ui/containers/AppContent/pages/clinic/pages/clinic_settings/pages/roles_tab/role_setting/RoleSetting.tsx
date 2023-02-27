import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import LoadingSpinner from '@components/loading_spinner';
import RefetchPanel from '@components/refetch_panel';
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
import VerticalPanel from '@components/vertical_panel';

interface RoleSettingProps {}
export default function RoleSetting({}: RoleSettingProps) {
  const [searchParams] = useSearchParams();
  const roleIdParam = searchParams.get('roleId');

  const isDirty = useIsDirty();
  const setSettings = useSetSettings();
  const [trigger, { data, isLoading, isFetching, isSuccess, isError }] =
    useLazyGetRoleByIdQuery();
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
  if (roleIdParam == undefined) return <VerticalPanel title="Select a role" />;
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
      {isFetching || isLoading ? (
        <LoadingSpinner />
      ) : isSuccess && data ? (
        <TabMenu items={['General', 'Permissions', 'Members', 'Queue']}>
          <RoleSettingGeneral
            slaveRole={data?.slaveRole}
            id={Number(roleIdParam)}
          />
          {<PermissionList />}
          <RoleSettingMembers
            id={Number(roleIdParam)}
            name={data?.name}
            priority={data.priority}
            description={data?.description}
            masterRole={data?.masterRole}
          />
        </TabMenu>
      ) : (
        isError && (
          <RefetchPanel
            action={() => {
              trigger(Number(roleIdParam) as any);
            }}
          />
        )
      )}
    </div>
  );
}
