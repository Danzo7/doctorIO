import PermissionItem from './Permission_item';
import { PERMISSIONS } from '@constants/permissions';
import './style/index.scss';
import { useGetPermissionsSettings } from '@stores/roleSettingStore';

export default function PermissionList() {
  const permissions = useGetPermissionsSettings();
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
