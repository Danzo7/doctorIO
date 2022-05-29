import NewRole from './new_role';
import RoleItem from './role_item';
import { useState } from 'react';
import './style/index.scss';

interface RoleType {
  roleName: string;
  linked?: string;
}
interface RoleListProps {
  roleList: RoleType[];
  selected?: number;
  height: number | string;
  defaultSelected?: number;
}
export default function RoleList({
  roleList,
  defaultSelected = 0,
}: RoleListProps) {
  const [selectedRole, setSelectedRole] = useState(defaultSelected);
  return (
    <div className={`role-list `}>
      <NewRole />
      <div className="content-list">
        {roleList.map(({ roleName, linked }, index) => (
          <RoleItem
            onClick={() => {
              setSelectedRole(index);
            }}
            roleName={roleName}
            selected={index == selectedRole}
            linked={linked}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
