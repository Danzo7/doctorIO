import IconicButton from '@components/buttons/iconic_button';
import React from 'react';
import MemberStatus from './member_status';
import './style/index.scss';
import Call_Icon from 'toSvg/callicon.svg?icon';
import color from '@assets/styles/color';
import ChatAddButton from './chat_add_button';
import InputField from '@components/inputs/input_field';
interface ChatProps {
  memberFullName: string;
  status: boolean;
}
export default function Chat({ memberFullName, status }: ChatProps) {
  return (
    <div className="chat">
      <div className="chat-header">
        <MemberStatus memberFullName={memberFullName} status={status} />
        <IconicButton
          Icon={Call_Icon}
          backgroundColor={color.secondary_color}
          afterColor={color.good_green}
          width={35}
          iconSize={15}
        />
      </div>
      <div className="chat-content"></div>
      <div className="chat-footer">
        <ChatAddButton />
        <InputField inputBackgroundColor="none" />
      </div>
    </div>
  );
}
