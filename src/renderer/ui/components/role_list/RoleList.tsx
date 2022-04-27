import NewRole from './new_role';
import RoleItem from './role_item';
import React, { useState } from 'react';
import './style/index.scss';
import { css } from '@emotion/css';

interface RoleType {
  roleName: string;
  linked?: boolean;
}
interface RoleListProps {
  roleList: RoleType[];
  selected?: number;
  height: number | string;
  defaultSelected?: number;
}
export default function RoleList({
  roleList,
  height = 500,
  defaultSelected = 0,
}: RoleListProps) {
  const [selectedRole, setSelectedRole] = useState(defaultSelected);
  return (
    <div
      className={`role-list ${css`
        height: ${typeof height === 'number' ? `${height}px` : ''};
        height: ${typeof height === 'string'
          ? height == '100%'
            ? 'unset'
            : `${height}`
          : ''};
      `} `}
    >
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
