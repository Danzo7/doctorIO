import PermissionItem from './Permission_item';
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
            editable={disabled}
            key={permissionName}
          />
        ),
      )}
    </div>
  );
}
