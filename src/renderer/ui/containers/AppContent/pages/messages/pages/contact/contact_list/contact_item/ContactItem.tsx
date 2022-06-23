import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import { NavLink } from 'react-router-dom';
import MemberActionControls from '@components/member_action_controls';
import { Member } from '@models/server.models';
interface ContactItemProps {
  status: boolean;
  imgSrc: string;
  fullName: string;
  cId: number;
  member: Member;
}
function ContactItem({
  status,
  imgSrc,
  fullName,
  cId,
  member,
}: ContactItemProps) {
  return (
    <NavLink to={cId?.toString() ?? ''} className="contact-item">
      <div className="info-container">
        <UserProfileStatus status={status} imgSrc={imgSrc} />
        <span>{fullName}</span>
      </div>
      <div className="avatars-container">
        <MemberActionControls member={member} messagesRoutePath="" />
      </div>
    </NavLink>
  );
}

export default ContactItem;
