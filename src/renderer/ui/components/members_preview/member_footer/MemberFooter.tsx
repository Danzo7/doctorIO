import './style/index.scss';
import MemberActionControls from '@components/member_action_controls';
import { Member } from '@models/server.models';
interface MemberFooterProps {
  member: Member;
}
function MemberFooter({ member }: MemberFooterProps) {
  const { memberId, memberStatus } = member;
  return (
    <div className="member-footer">
      <div className="member-container">
        <span>Member ID</span>
        <span className="member-span">{memberId}</span>
      </div>
      <div className="member-container">
        <span>Status</span>
        <span className="member-span">
          {memberStatus ? 'Online' : 'Offline'}
        </span>
      </div>
      <MemberActionControls member={member} />
    </div>
  );
}

export default MemberFooter;
