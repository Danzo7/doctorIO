import BorderSeparator from '@components/border_separator';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import usePrompt from '@libs/HistoryBlocker';
import { Role } from '@models/server.models';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PermissionItem from '../permission_list/Permission_item';
import './style/index.scss';

interface Inputs {
  roleName: string;
  roleDesc: string;
}

export default function RoleSettingGeneral({
  roleName,
  roleDesc,
  linkedRole,
}: Pick<Role, 'roleName' | 'roleDesc' | 'linkedRole'>) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    defaultValues: { roleName: roleName, roleDesc: roleDesc },
  });
  useEffect(() => {
    reset({ roleName: roleName, roleDesc: roleDesc });
  }, [roleName, roleDesc, reset]);

  usePrompt(
    'are you sure about that !!!',
    ({ closeOVerlay, dismiss }) => (
      <TextButton
        text="OK"
        onPress={() => {
          dismiss();
          closeOVerlay();
        }}
      />
    ),
    isDirty,
  );

  return (
    <div className="role-setting-general">
      <div className="role-setting-general-inputs">
        <Input
          label="Role Name"
          type={'text'}
          name={'roleName'}
          control={control}
        />
        <Input
          label="Description"
          type={'text'}
          name={'roleDesc'}
          control={control}
        />
        <BorderSeparator direction="horizontal" />
      </div>
      <PermissionItem
        name="Assistants"
        description="Members with the below roles will be able to access and manage role personal queue List"
        editable
        linkedPermission={linkedRole?.roleName}
        isChecked={linkedRole ? true : undefined}
      />
    </div>
  );
}
