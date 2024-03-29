import BorderSeparator from '@components/border_separator';
import Input from '@components/inputs/input';
import LoadingSpinner from '@components/loading_spinner';
import { mapIndexFromPermissions } from '@helpers/permission.helper';
import { Role } from '@models/server.models';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import { useCreateNewRoleMutation } from '@redux/clinic/rbac/role/roleApi';

import { useRoleSettingStore, useSetSettings } from '@stores/roleSettingStore';
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
  id,
}: Pick<Role, 'slaveRole' | 'id'>) {
  const { control, reset } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { name: '', description: '' },
  });
  const setSettings = useSetSettings();
  const { name, description, permissions } = useRoleSettingStore((s) => ({
    name: s.name,
    description: s.description,
    permissions: s.permissions,
  }));
  const [CreateNewRole] = useCreateNewRoleMutation();
  const { data, isSuccess, isLoading } = useGetMyMemberDetailQuery();

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
            })
          }
        />
        <BorderSeparator direction="horizontal" />
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        permissions?.includes('CAN_HAVE_QUEUE') &&
        !permissions?.includes('CAN_MANAGE_QUEUE') &&
        isSuccess && (
          <PermissionItem
            name="Assistants"
            description="Members with the below roles will be able to access and manage role personal queue List"
            editable={data.roles.find(({ id: rId }) => rId === id) != undefined}
            linkedPermission={slaveRole?.name}
            isChecked={slaveRole ? true : undefined}
            onChange={(isChecked) => {
              if (!slaveRole && isChecked) {
                CreateNewRole({
                  name: 'New Helper',
                  description: 'this is your bot',
                  masterRoleId: id,
                  permissions: mapIndexFromPermissions([
                    'CAN_MANAGE_QUEUE',
                    'CAN_ADD_PATIENT',
                    'CAN_VIEW_PATIENTSLIST',
                  ]),
                });
              }
            }}
          />
        )
      )}
    </div>
  );
}
