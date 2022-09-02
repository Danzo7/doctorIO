import BorderSeparator from '@components/border_separator';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import usePrompt from '@libs/HistoryBlocker';
import { Role } from '@models/server.models';
import roleApi from '@redux/clinic/rbac/role/roleApi';
import { setRoleSettings } from '@redux/clinic/rbac/role/roleSettingSlice';
import store, { useAppDispatch } from '@store';
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
    watch,
    formState: { isDirty },
  } = useForm<Inputs>({
    defaultValues: { name, description },
    mode: 'onChange',
  });
  useEffect(() => {
    reset({ name, description }, { keepDirty: true });
  }, [name, description, reset]);
  const dispatch = useAppDispatch();
  watch();
  return (
    <div className="role-setting-general">
      <div className="role-setting-general-inputs">
        <Input
          label="Role Name"
          type={'text'}
          name={'name'}
          control={control}
          onChange={(v) => {
            console.log('name change');
            dispatch(
              setRoleSettings({
                name: v,
                isDirty,
              }),
            );
          }}
        />
        <Input
          label="Description"
          type={'text'}
          name={'description'}
          control={control}
          onChange={(v) => {
            dispatch(
              setRoleSettings({
                description: v,
                isDirty,
              }),
            );
          }}
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
