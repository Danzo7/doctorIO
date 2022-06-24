import { roleMember } from '@api/fake';
import RoleMembers from './role_members';
import './style/index.scss';

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
