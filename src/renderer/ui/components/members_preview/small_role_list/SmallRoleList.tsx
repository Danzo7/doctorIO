import DarkAddButton from '@components/buttons/dark_add_button';
import AddRoleTooltip from '@components/poppers/add_role_tooltip';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Member, Role } from '@models/server.models';
import { useState } from 'react';
import SmallRolePreview from '../small_role_preview';
import './style/index.scss';
interface SmallRoleListProps {
  roleList: Role[];
  //REFACTOR:add memberId
}
export default function SmallRoleList({
  roleList,
  memberId,
}: SmallRoleListProps & Pick<Member, 'memberId'>) {
  const [roles, setRoles] = useState(roleList);
  const { open, close } = useOverlay();
  //REDUX RemoveRole(memberId,roleId)
  const addRole = (newRole: Role) => {
    setRoles((prev) => {
      return [...prev, newRole];
    });
    close();
  };
  const deleteRole = (deletedRole: Role) => {
    setRoles((prev) => {
      return prev.filter((role) => role.roleName != deletedRole.roleName);
    });
  };
  return (
    <div className="role-list-small">
      {roles.map((role, index) => (
        <SmallRolePreview
          roleName={role.roleName}
          key={role.roleId.toString() + index}
          onClick={() => {
            deleteRole(role);
          }}
        />
      ))}

      <DarkAddButton
        onPress={(e) => {
          if (e)
            open(
              <AddRoleTooltip
                actionList={[
                  {
                    role: {
                      roleName: 'Cool',
                      roleId: 1,
                      roleDesc: 'cool Role',
                    },
                    onPress: addRole,
                  },
                  {
                    role: {
                      roleName: 'Gamer',
                      roleId: 2,
                      roleDesc: 'Gamer Role',
                    },
                    onPress: addRole,
                  },
                  {
                    role: {
                      roleName: 'Cool',
                      roleId: 3,
                      roleDesc: 'cool Role',
                    },
                    onPress: addRole,
                  },
                  {
                    role: {
                      roleName: 'Support',
                      roleId: 1,
                      roleDesc: 'Support  Role',
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
    </div>
  );
}
