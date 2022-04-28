import IconicButton from '@components/buttons/iconic_button';
import MemberStatus from './member_status';
import './style/index.scss';
import Call_Icon from 'toSvg/callicon.svg?icon';
import color from '@assets/styles/color';
import ChatAddButton from './chat_add_button';
import InputField from '@components/inputs/input_field';
import ContentMessage from './content_message';
import client from '@assets/pictures/test.png';

interface ChatProps {
  memberFullName: string;
  status: boolean;
  sepPos: number;
}
export default function Chat({ memberFullName, status, sepPos }: ChatProps) {
  const messagesArray = [
    {
      imgSrc: client,
      messengerName: 'Aymen',
      messageTime: 'Today at 12:18AM',
      messageContent: 'wach ',
    },
    {
      imgSrc: client,
      messengerName: 'brahim',
      messageTime: 'Today at 12:18AM',
      messageContent: 'wassap ',
    },
    {
      imgSrc: client,
      messengerName: 'Aymen',
      messageTime: 'Today at 12:18AM',
      messageContent:
        'asma3 choflna khalek gadwa ki natl3o la fac 3la jal nifi bach najwaz ',
    },
    {
      imgSrc: client,
      messengerName: 'brahim',
      messageTime: 'Today at 12:18AM',
      messageContent: 'ok mor nhoto dossier ta3 la fac nrouho lih inchallh ',
    },
  ];
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
      <div className="chat-content">
        <div className="content-message-List">
          {messagesArray.map(
            ({ messengerName, imgSrc, messageTime, messageContent }, index) => (
              <ContentMessage
                isLastMessageSent={
                  index == sepPos && sepPos != messagesArray.length
                }
                messengerName={messengerName}
                imgSrc={imgSrc}
                messageTime={messageTime}
                messageContent={messageContent}
              />
            ),
          )}
        </div>
      </div>
      <InputField
        name="msg"
        background={color.lighter_background}
        leading={<ChatAddButton />}
        radius={17}
      />
    </div>
  );
}
