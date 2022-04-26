import PermissionItem from '@components/new_permission';
import { css } from '@emotion/css';
import React from 'react';
import './style/index.scss';
interface PermissionListProps {
  permissionArray: any[];
  height: number | string;
}
export default function PermissionList({
  permissionArray,
  height,
}: PermissionListProps) {
  return (
    <div
      className={`permission-list ${css`
        height: ${typeof height === 'number' ? `${height}px` : ''};
        height: ${typeof height === 'string'
          ? height == '100%'
            ? 'unset'
            : `${height}`
          : ''};
      `} `}
    >
      {permissionArray ? (
        permissionArray.map(
          ({
            permissionName,
            permissionDescription,
            linkedPermission,
            disabled,
          }) => (
            <PermissionItem
              permissionName={permissionName}
              permissionDescription={permissionDescription}
              linkedPermission={linkedPermission}
              disabled={disabled}
              key={permissionName}
            />
          ),
        )
      ) : (
        <div>No permissions</div>
      )}
    </div>
  );
}
