import DarkAddButton from '@components/buttons/dark_add_button';
import LoadingSpinner from '@components/loading_spinner';
import AddRoleTooltip from '@components/poppers/add_role_tooltip';
import { isAllowed } from '@helpers/permission.helper';
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
  const { data, isSuccess, isLoading } = useGetMyPermissionQuery();
  if (isSuccess)
    console.log('allowed', isAllowed('CAN_MANAGE_MEMBERS', data.permissions));
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
              isAllowed('CAN_MANAGE_MEMBERS', data.permissions) &&
              data.lvl != undefined &&
              data.lvl < role.priority
            }
            onClick={() => {
              onDelete?.(role);
            }}
          />
        ))
      )}

      {isSuccess && isAllowed('CAN_MANAGE_MEMBERS', data.permissions) && (
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
      )}
    </div>
  );
}
