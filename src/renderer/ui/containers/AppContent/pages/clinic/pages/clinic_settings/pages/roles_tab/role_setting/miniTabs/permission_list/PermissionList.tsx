import PermissionItem from './Permission_item';
import { PERMISSIONS } from '@constants/permissions';
import './style/index.scss';
import {
  useGetPermissionsSettings,
  useSetSettings,
} from '@stores/roleSettingStore';

export default function PermissionList() {
  const permissions = useGetPermissionsSettings();
  const setSettings = useSetSettings();
  return (
    <div className="permission-list">
      {PERMISSIONS.map(({ description, permKey, name }) => (
        <PermissionItem
          isChecked={permissions.includes(permKey)}
          name={name}
          description={description}
          editable={true}
          key={permKey}
          onChange={(isChecked) => {
            if (isChecked) {
              setSettings({
                permissions: [...permissions, permKey],
              });
            }
            if (!isChecked) {
              setSettings({
                permissions: permissions.filter((p) => p !== permKey),
              });
            }
          }}
        />
      ))}
    </div>
  );
}
