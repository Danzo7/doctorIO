import { Role } from '@models/server.models';
import RoleMembers from './role_members';
import './style/index.scss';

const roleMember: Role[] = [
  {
    roleId: 1,
    roleName: 'Support',
    roleDesc:
      'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh brahim aymen hhhhhhhhhhhhhhhhhhhhhhhhhhhh daouadji aymen',
  },
  {
    roleId: 2,
    roleName: 'Doctor',
    roleDesc:
      'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh brahim aymen hhhhhhhhhhhhhhhhhhhhhhhhhhhh daouadji aymen',
  },
  {
    roleId: 3,
    roleName: 'helper',
    roleDesc:
      'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh brahim aymen hhhhhhhhhhhhhhhhhhhhhhhhhhhh daouadji aymen',
  },
  {
    roleId: 4,
    roleName: 'Patient',
    roleDesc:
      'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh brahim aymen hhhhhhhhhhhhhhhhhhhhhhhhhhhh daouadji aymen',
  },
];

interface MembersTabProps {}
export default function MembersTab({}: MembersTabProps) {
  return (
    <div className="members-tab">
      {roleMember.map(({ roleId, roleName, roleDesc }, index) => (
        <RoleMembers
          roleName={roleName}
          key={index}
          roleDesc={roleDesc}
          roleId={roleId}
        />
      ))}
    </div>
  );
}
