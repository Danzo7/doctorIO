import UserProfileStatus from '@components/user_profile_status';
import React from 'react';
import './style/index.scss';
import colors from '@assets/styles/color';
import IdCard from 'toSvg/id_card.svg';
import Messages from 'toSvg/messagesSmall.svg';
import Call_Icon from 'toSvg/callicon.svg';
import IconicButton from '@components/buttons/iconic_button';
interface ContactItemProps {
  status: boolean;
  imgSrc: string;
  fullName: string;
}
function ContactItem({ status, imgSrc, fullName }: ContactItemProps) {
  return (
    <div className="contact-item">
      <div className="info-container">
        <UserProfileStatus status={status} imgSrc={imgSrc} />
        <span>{fullName}</span>
      </div>
      <div className="avatars-container">
        <IconicButton
          Icon={IdCard}
          afterColor={colors.secondary_color}
          width={40}
        />
        <IconicButton
          Icon={Messages}
          afterColor={colors.secondary_color}
          width={40}
        />
        <IconicButton
          Icon={Call_Icon}
          afterColor={colors.good_green}
          width={40}
        />
      </div>
    </div>
  );
}

export default ContactItem;
