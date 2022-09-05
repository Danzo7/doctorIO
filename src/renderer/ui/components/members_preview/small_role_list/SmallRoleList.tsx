import { AbilityContext, Can } from '@ability/Ability';
import { useAbility } from '@casl/react';
import DarkAddButton from '@components/buttons/dark_add_button';
import LoadingSpinner from '@components/loading_spinner';
import AddRoleTooltip from '@components/poppers/add_role_tooltip';
import { useOverlay } from '@libs/overlay/useOverlay';
import { RoleBrief } from '@models/server.models';
import { useGetMyPermissionQuery } from '@redux/clinic/rbac/member/memberApi';

import SmallRolePreview from '../small_role_preview';
import './style/index.scss';
interface SmallRoleListProps {
  roleList: RoleBrief[];
  onAdd?: (role: RoleBrief) => void;
  onDelete?: (role: RoleBrief) => void;
}
export default function SmallRoleList({
  roleList,
  onAdd,
  onDelete,
}: SmallRoleListProps) {
  const { open, close } = useOverlay();
  const ability = useAbility(AbilityContext);
  const { data, isSuccess, isLoading } = useGetMyPermissionQuery();
  if (isSuccess) console.log('allowed', ability.can('manage', 'members'));
  return (
    <div className="role-list-small">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        isSuccess &&
        roleList.map((role, index) => (
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
                open(
                  <AddRoleTooltip
                    onSelect={(role) => {
                      onAdd?.(role);
                      close();
                    }}
                    lvl={data.lvl}
                  />,
                  {
                    closeOnClickOutside: true,
                    clickThrough: true,
                    closeOnBlur: true,
                    popperTarget: e.currentTarget,
                  },
                );
            }}
          />
        </Can>
      )}
    </div>
  );
}
