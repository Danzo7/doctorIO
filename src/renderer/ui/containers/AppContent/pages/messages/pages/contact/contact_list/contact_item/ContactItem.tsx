import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import colors from '@assets/styles/color';
import IdCard from 'toSvg/id_card.svg?icon';
import Messages from 'toSvg/messages_small.svg?icon';
import Call_Icon from 'toSvg/phone.svg?icon';
import IconicButton from '@components/buttons/iconic_button';
import { NavLink } from 'react-router-dom';
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
        <IconicButton
          Icon={IdCard}
          afterBgColor={colors.secondary_color}
          width={40}
          iconSize={15}
          type="button"
          onPress={() => {}}
        />
        <IconicButton
          Icon={Messages}
          afterBgColor={colors.secondary_color}
          width={40}
          iconSize={15}
          type="button"
          onPress={() => {}}
        />
        <IconicButton
          Icon={Call_Icon}
          afterBgColor={colors.good_green}
          width={40}
          iconSize={15}
          type="button"
          onPress={() => {}}
        />
      </div>
    </NavLink>
  );
}

export default ContactItem;
