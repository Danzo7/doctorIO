import { currentMemberPermissions } from '@api/fake';
import DarkAddButton from '@components/buttons/dark_add_button';
import AddRoleTooltip from '@components/poppers/add_role_tooltip';
import { isAllowed } from '@helpers/permission.helper';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Role, RoleBrief } from '@models/server.models';
import { useState } from 'react';
import SmallRolePreview from '../small_role_preview';
import './style/index.scss';
interface SmallRoleListProps {
  roleList: RoleBrief[];
  memberId?: number;
}
export default function SmallRoleList({
  roleList,
  memberId,
}: SmallRoleListProps) {
  const [roles, setRoles] = useState(roleList);
  const { open, close } = useOverlay();
  //REDUX RemoveRole(memberId,roleId)
  const permissions = currentMemberPermissions; //REDUX getCurrentPermissions
  const addRole = (newRole: RoleBrief) => {
    setRoles((prev) => {
      return [...prev, newRole];
    });
    close();
  }; //REDUX AddRole(memberId,roleId)
  const deleteRole = (deletedRole: Role) => {
    setRoles((prev) => {
      return prev.filter((role) => role.name != deletedRole.name);
    });
  }; //REDUX RemoveRole(memberId,roleId)
  return (
    <div className="role-list-small">
      {roles.map((role, index) => (
        <SmallRolePreview
          roleName={role.name}
          key={role.id.toString() + index}
          canRemove={isAllowed('CAN_MANAGE_MEMBERS', permissions)}
          onClick={() => {
            // deleteRole(role);
          }}
        />
      ))}

      {isAllowed('CAN_MANAGE_MEMBERS', permissions) && (
        <DarkAddButton
          onPress={(e) => {
            if (e)
              open(
                <AddRoleTooltip
                  actionList={[
                    {
                      role: {
                        name: 'Cool',
                        id: 1,
                        priority: 1,
                      },
                      onPress: addRole,
                    },
                  ]}
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
