import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import colors from '@assets/styles/color';
import IdCard from 'toSvg/id_card.svg?icon';
import Messages from 'toSvg/messages_small.svg?icon';
import Call_Icon from 'toSvg/phone.svg?icon';
import IconicButton from '@components/buttons/iconic_button';
import { NavLink } from 'react-router-dom';
import MemberActionControls from '@components/member_action_controls';
interface ContactItemProps {
  status: boolean;
  imgSrc: string;
  fullName: string;
  cId: string;
}
function ContactItem({ status, imgSrc, fullName, cId }: ContactItemProps) {
  return (
    <NavLink to={cId?.toString() ?? ''} className="contact-item">
      <div className="info-container">
        <UserProfileStatus status={status} imgSrc={imgSrc} />
        <span>{fullName}</span>
      </div>
      <div className="avatars-container">
        <MemberActionControls memberID={cId} messagesRoutePath="" />
      </div>
    </NavLink>
  );
}

export default ContactItem;
