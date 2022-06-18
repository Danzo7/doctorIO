import './style/index.scss';
import MemberActionControls from '@components/member_action_controls';
interface MemberFooterProps {
  memberID: string;
  status: string;
}
function MemberFooter({ memberID, status }: MemberFooterProps) {
  return (
    <div className="member-footer">
      <div className="member-container">
        <span>Member ID</span>
        <span className="member-span">{memberID}</span>
      </div>
      <div className="member-container">
        <span>Status</span>
        <span className="member-span">{status}</span>
      </div>
      <MemberActionControls memberID="123456789" />
    </div>
  );
}

export default MemberFooter;
