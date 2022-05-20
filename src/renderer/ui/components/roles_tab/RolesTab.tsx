import RoleList from './role_list';
import RoleSetting from './role_setting';
import './style/index.scss';
interface RolesTabProps {
  roleList?: any[];
  permissionArray?: any[];
}

export default function RolesTab({
  roleList = [
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Support', linked: '@doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Support', linked: '@doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Support', linked: '@doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
  ],
  permissionArray = [
    {
      permissionName: 'administrator',
      permissionDescription:
        'Can access to database and edit clinic information',
      disabled: true,
    },
    {
      permissionName: 'Assistant',
      permissionDescription:
        '   people with this role will assist another role, mean they can only access to the dependent role permission',
      linkedPermission: ' @Rythm#3722',
    },
    {
      permissionName: 'Access to patients List',
      permissionDescription: 'This is an example permission',
    },
    {
      permissionName: 'Assistant',
      permissionDescription:
        '   people with this role will assist another role, mean they can only access to the dependent role permission',
      linkedPermission: ' @Rythm#3722',
    },
    {
      permissionName: 'Add patients',
      permissionDescription: '  This is an example permission',
    },
    {
      permissionName: 'Edit patients data',
      permissionDescription: ' This is an example permission',
    },
  ],
}: RolesTabProps) {
  return (
    <div className="roles-tab">
      <RoleList roleList={roleList} height="100%" />
      <RoleSetting permissionArray={permissionArray} />
    </div>
  );
}
