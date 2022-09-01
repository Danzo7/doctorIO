import { rolesBrief } from '@api/fake';
import RoleMembers from './role_members';
import './style/index.scss';

interface MembersTabProps {}
export default function MembersTab({}: MembersTabProps) {
  return (
    <div className="members-tab">
      {rolesBrief.map((role, index) => (
        <RoleMembers {...role} key={index} />
      ))}
    </div>
  );
}
