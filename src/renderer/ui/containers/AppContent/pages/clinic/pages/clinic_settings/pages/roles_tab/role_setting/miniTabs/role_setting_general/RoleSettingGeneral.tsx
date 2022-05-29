import BorderSeparator from '@components/border_separator';
import Input from '@components/inputs/input';
import PermissionItem from '../permission_list/Permission_item';
import './style/index.scss';
interface RoleSettingGeneralProps {}
export default function RoleSettingGeneral({}: RoleSettingGeneralProps) {
  return (
    <div className="role-setting-general">
      <div className="role-setting-general-inputs">
        <Input label="Name" type={'text'} />
        <Input label="Description" type={'text'} />
        <BorderSeparator direction="horizontal" />
      </div>
      <PermissionItem
        permissionName="Assistants"
        permissionDescription="Members with the below roles will be able to access and manage role personal queue List"
        editable
        linkedPermission="Doctor"
      />
    </div>
  );
}
