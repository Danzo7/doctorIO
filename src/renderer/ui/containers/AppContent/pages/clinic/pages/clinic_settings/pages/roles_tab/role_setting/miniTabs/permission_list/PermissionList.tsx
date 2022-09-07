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
      {PERMISSIONS.map(({ description, permKey, name }) =>
        (permissions.includes('CAN_HAVE_QUEUE') &&
          permKey === 'CAN_MANAGE_QUEUE') ||
        (permissions.includes('CAN_MANAGE_QUEUE') &&
          permKey === 'CAN_HAVE_QUEUE') ? null : (
          <PermissionItem
            isChecked={permissions.includes(permKey)}
            name={name}
            description={description}
            editable={permKey === 'CAN_MANAGE_QUEUE' ? false : true}
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
        ),
      )}
    </div>
  );
}
