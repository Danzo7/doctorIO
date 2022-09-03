import color from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import { mapIndexFromPermissions } from '@helpers/permission.helper';
import usePrompt from '@libs/HistoryBlocker';
import { Role } from '@models/server.models';
import roleApi, {
  useUpdateRoleMutation,
} from '@redux/clinic/rbac/role/roleApi';
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
    formState: { isDirty, dirtyFields },
  } = useForm<Inputs>({
    defaultValues: { name, description },
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  dispatch(
    setRoleSettings({
      name: watch('name'),
      description: watch('description'),
      isDirty,
    }),
  );
  console.log('dirtyFields :', dirtyFields);
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
