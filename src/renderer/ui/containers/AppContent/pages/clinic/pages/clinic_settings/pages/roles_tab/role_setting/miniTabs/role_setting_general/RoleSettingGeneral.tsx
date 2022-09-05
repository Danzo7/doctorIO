import BorderSeparator from '@components/border_separator';
import Input from '@components/inputs/input';
import { Role } from '@models/server.models';

import {
  useGetDefaults,
  useRoleSettingStore,
  useSetSettings,
} from '@stores/roleSettingStore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PermissionItem from '../permission_list/Permission_item';
import './style/index.scss';

interface Inputs {
  name: string;
  description: string;
}

export default function RoleSettingGeneral({
  slaveRole,
}: Pick<Role, 'slaveRole'>) {
  const { control, reset } = useForm<Inputs>({
    mode: 'onChange',
  });
  const setSettings = useSetSettings();
  const defaults = useGetDefaults();
  const { name, description } = useRoleSettingStore.getState();

  useEffect(() => {
    reset({ name: name ?? '', description: description });
  }, [description, name, reset]);
  return (
    <div className="role-setting-general">
      <div className="role-setting-general-inputs">
        <Input
          label="Role Name"
          type={'text'}
          name={'name'}
          control={control}
          onChange={(e) =>
            setSettings({
              name: e,
              isDirty: e != defaults?.name,
            })
          }
        />
        <Input
          label="Description"
          type={'text'}
          name={'description'}
          control={control}
          onChange={(e) =>
            setSettings({
              description: e,
              isDirty: e != defaults?.description,
            })
          }
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
