import NewRole from '@components/new_role';
import RoleItem from '@components/role_item';
import React from 'react';
import './style/index.scss';

interface RoleType {
  roleName: string;
  selected: boolean;
  linked?: boolean;
}
interface RoleListProps {
  roleList: RoleType[];
}
export default function RoleList({ roleList }: RoleListProps) {
  return (
    <div className="role-list">
      <NewRole />
      {roleList.map(({ roleName, selected, linked }) => (
        <RoleItem roleName={roleName} selected={selected} linked={linked} />
      ))}
    </div>
  );
}
