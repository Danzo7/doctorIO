import IconicButton from '@components/buttons/iconic_button';
import React from 'react';
import './style/index.scss';
import colors from '@assets/styles/color';
import IdCard from 'toSvg/id_card.svg';
import Messages from 'toSvg/messagesSmall.svg';
import Call_Icon from 'toSvg/callicon.svg';
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
      <div className="controls-container">
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

export default MemberFooter;
