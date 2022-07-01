import IconicButton from '@components/buttons/iconic_button';
import MemberStatus from './member_status';
import './style/index.scss';
import Call_Icon from 'toSvg/phone.svg?icon';
import colors from '@assets/styles/color';
import ChatAddButton from '@components/buttons/chat_add_button';
import ContentMessage from './content_message';
import { useParams } from 'react-router-dom';
import InputWrapper from '@components/inputs/input_wrapper';
import { currentMember, DMs, members } from '@api/fake';

interface ChatProps {}
export default function Chat({}: ChatProps) {
  const { dmId } = useParams();
  //REDUX fetch for selected dm
  const dm = DMs.filter(
    ({ dmId: id }) => id === Number.parseInt(dmId ?? '404'),
  )[0];
  const contactMember = members.filter(({ userId }) => userId == dm.userId)[0];
  //REDUX check if dm is assigned to a member
  return (
    <div className="chat">
      {dmId}
      <div className="chat-header">
        <MemberStatus
          memberFullName={contactMember.name}
          status={contactMember.memberStatus}
        />
        <IconicButton
          Icon={Call_Icon}
          backgroundColor={colors.secondary_color}
          afterBgColor={colors.good_green}
          width={35}
          iconSize={15}
        />
      </div>
      <div className="chat-content">
        <div className="content-message-List">
          {dm.messages.map((message, index) => (
            <ContentMessage
              message={message}
              key={index}
              dmAvatar={message.sent ? currentMember.avatar : dm.dmAvatar}
              dmId={dm.dmId}
              dmName={message.sent ? currentMember.name : dm.dmName}
              memberId={
                message.sent ? currentMember.memberId : contactMember.memberId
              }
            />
          ))}
        </div>
      </div>
      <InputWrapper
        leading={<ChatAddButton />}
        radius={17}
        background={colors.lighter_background}
        fillContainer
      >
        <input />
      </InputWrapper>
    </div>
  );
}
