import RoleMembers from './role_members';
import './style/index.scss';

const members = [
  {
    roleName: 'Support',
    description:
      'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh brahim aymen hhhhhhhhhhhhhhhhhhhhhhhhhhhh daouadji aymen',
  },
  {
    roleName: 'Doctor',
    description:
      'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh brahim aymen hhhhhhhhhhhhhhhhhhhhhhhhhhhh daouadji aymen',
  },
  {
    roleName: 'helper',
    description:
      'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh brahim aymen hhhhhhhhhhhhhhhhhhhhhhhhhhhh daouadji aymen',
  },
  {
    roleName: 'Patient',
    description:
      'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh brahim aymen hhhhhhhhhhhhhhhhhhhhhhhhhhhh daouadji aymen',
  },
];

interface MembersTabProps {}
export default function MembersTab({}: MembersTabProps) {
  return (
    <div className="members-tab">
      {members.map(({ roleName, description }, index) => (
        <RoleMembers
          roleName={roleName}
          key={index}
          description={description}
        />
      ))}
    </div>
  );
}
