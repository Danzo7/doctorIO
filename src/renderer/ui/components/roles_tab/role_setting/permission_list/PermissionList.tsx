import PermissionItem from '@components/new_permission';
import React from 'react';
import './style/index.scss';
interface PermissionListProps {
  permissionArray: any[];
}
export default function PermissionList({
  permissionArray,
}: PermissionListProps) {
  return (
    <div className="permission-list">
      {permissionArray.map(
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
      )}
    </div>
  );
}
