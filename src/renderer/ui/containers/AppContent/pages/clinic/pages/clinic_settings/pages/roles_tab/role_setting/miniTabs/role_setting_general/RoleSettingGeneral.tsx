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
  name: string;
  description: string;
}

export default function RoleSettingGeneral({
  name,
  description,
  slaveRole,
}: Pick<Role, 'name' | 'description' | 'slaveRole'>) {
  const {
    control,
    reset,
    formState: { isDirty },
  } = useForm<Inputs>({
    defaultValues: { name, description },
  });
  useEffect(() => {
    reset({ name, description });
  }, [name, description, reset]);

  usePrompt(
    'are you sure about that !!!',
    ({ closeOverlay: closeOVerlay, dismiss }) => (
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
          name={'name'}
          control={control}
        />
        <Input
          label="Description"
          type={'text'}
          name={'description'}
          control={control}
        />
        <BorderSeparator direction="horizontal" />
      </div>
      <PermissionItem
        name="Assistants"
        description="Members with the below roles will be able to access and manage role personal queue List"
        editable
        linkedPermission={slaveRole?.name}
        isChecked={slaveRole ? true : undefined}
      />
    </div>
  );
}
