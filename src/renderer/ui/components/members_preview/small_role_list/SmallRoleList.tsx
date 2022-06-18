import DarkAddButton from '@components/buttons/dark_add_button';
import AddRoleTooltip from '@components/poppers/add_role_tooltip';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useState } from 'react';
import SmallRolePreview from '../small_role_preview';
import './style/index.scss';
interface SmallRoleListProps {
  roleList: string[];
  //todo:memberObject
}
export default function SmallRoleList({ roleList }: SmallRoleListProps) {
  const [roles, setRoles] = useState(roleList);
  const { open } = useOverlay();

  const addRole = (text: string) => {
    setRoles((prev) => {
      return [...prev, text];
    });
  };
  const deleteRole = (text: string) => {
    setRoles((prev) => {
      return prev.filter((roleText) => roleText != text);
    });
  };
  return (
    <div className="role-list-small">
      {roles.map((rollName, index) => (
        <SmallRolePreview
          roleName={rollName}
          key={index}
          onClick={() => {
            deleteRole(rollName);
          }}
        />
      ))}

      <DarkAddButton
        onPress={(e) => {
          open(
            <AddRoleTooltip
              actionList={[
                {
                  text: 'Cool',
                  onPress: addRole,
                },
                {
                  text: 'Owener',
                  onPress: addRole,
                },
                {
                  text: 'Support',
                  onPress: addRole,
                },
                {
                  text: 'Pan Legends',
                  onPress: addRole,
                },
              ]}
            />,
            {
              closeOnClickOutside: true,
              clickThrough: true,
              closeOnBlur: true,
              popperTarget: e?.currentTarget,
            },
          );
        }}
      />
    </div>
  );
}
