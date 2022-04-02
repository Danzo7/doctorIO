import UserProfileStatus from '@components/user_profile_status';
import React from 'react';
import './style/index.scss';
import colors from '@assets/styles/color';
import IdCard from 'toSvg/idCard.svg';
import Messages from 'toSvg/messagesSmall.svg';
import Call_Icon from 'toSvg/callicon.svg';
import IconicButton from '@components/buttons/iconic_button';
interface ContactItemProps {
  status: boolean;
  img_src: string;
  fullName: string;
}
function ContactItem({ status, img_src, fullName }: ContactItemProps) {
  return (
    <div className="contact-item">
      <div className="info-container">
        <UserProfileStatus status={status} img_src={img_src} />
        <span>{fullName}</span>
      </div>
      <div className="avatars-container">
        <IconicButton Icon={IdCard} backgroundColor={colors.secondary_color} />
        <IconicButton Icon={Messages} backgroundColor={colors.cold_blue} />
        <IconicButton Icon={Call_Icon} backgroundColor={colors.good_green} />
      </div>
    </div>
  );
}

export default ContactItem;
