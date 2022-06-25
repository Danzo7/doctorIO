import { Permission } from '@models/server.models';
import PermissionItem from './Permission_item';
import './style/index.scss';
interface PermissionListProps {
  list: Permission[];
}
export default function PermissionList({
  list: permissionArray,
}: PermissionListProps) {
  return (
    <div className="permission-list">
      {permissionArray.map(({ description, permKey, name }) => (
        <PermissionItem
          name={name}
          description={description}
          editable={true}
          key={permKey}
          permKey={permKey}
        />
      ))}
    </div>
  );
}
