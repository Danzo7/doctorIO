import Can from '@ability/index';
import DarkAddButton from '@components/buttons/dark_add_button';
import LoadingSpinner from '@components/loading_spinner';
import AddRoleTooltip from '@components/poppers/add_role_tooltip';
import { RoleBrief } from '@models/server.models';
import { useGetMyPermissionQuery } from '@redux/clinic/rbac/member/memberApi';
import { useAbility } from '@stores/abilityStore';

import SmallRolePreview from '../small_role_preview';
import './style/index.scss';
import { tooltip } from '@libs/overlay';
interface SmallRoleListProps {
  roleList: RoleBrief[];
  onAdd?: (role: RoleBrief) => void;
  onDelete?: (role: RoleBrief) => void;
  sort?: true;
}
export default function SmallRoleList({
  roleList,
  onAdd,
  onDelete,
  sort,
}: SmallRoleListProps) {
  const ability = useAbility();
  const { data, isSuccess, isLoading } = useGetMyPermissionQuery();
  return (
    <div className="role-list-small">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        isSuccess &&
        (sort
          ? roleList.sort((a, b) => a.priority - b.priority)
          : roleList
        ).map((role, index) => (
          <SmallRolePreview
            roleName={role.name}
            key={role.id.toString() + index}
            canRemove={
              ability.can('manage', 'members') &&
              data.lvl != undefined &&
              data.lvl < role.priority
            }
            onClick={() => {
              onDelete?.(role);
            }}
          />
        ))
      )}

      {isSuccess && (
        <Can I="manage" a="members">
          <DarkAddButton
            onPress={(e) => {
              if (e)
                tooltip(
                  ({ close }) => (
                    <AddRoleTooltip
                      skipRoles={roleList}
                      onSelect={(role) => {
                        onAdd?.(role);
                        close();
                      }}
                      lvl={data.lvl}
                    />
                  ),
                  e.currentTarget,
                ).open();
            }}
          />
        </Can>
      )}
    </div>
  );
}
