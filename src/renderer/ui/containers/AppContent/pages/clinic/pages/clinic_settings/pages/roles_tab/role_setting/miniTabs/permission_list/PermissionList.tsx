import { PermKeys } from '@models/server.models';
import PermissionItem from './Permission_item';
import { PERMISSIONS } from '@constants/permissions';
import './style/index.scss';
interface PermissionListProps {
  permissions: PermKeys[];
}
export default function PermissionList({ permissions }: PermissionListProps) {
  return (
    <div className="permission-list">
      {PERMISSIONS.map(({ description, permKey, name }) => (
        <PermissionItem
          isChecked={permissions.includes(permKey)}
          name={name}
          description={description}
          editable={true}
          key={permKey}
        />
      ))}
    </div>
  );
}
