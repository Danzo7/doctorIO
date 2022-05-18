import IconicButton from '@components/buttons/iconic_button';
import MemberStatus from './member_status';
import './style/index.scss';
import Call_Icon from 'toSvg/phone.svg?icon';
import color from '@assets/styles/color';
import ChatAddButton from '@components/buttons/chat_add_button';
import InputField from '@components/inputs/input_field';
import ContentMessage from './content_message';
import client from '@assets/pictures/test.png';
import { useParams } from 'react-router-dom';

interface ChatProps {}
export default function Chat({}: ChatProps) {
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
  const sepPos = 2;
  const { dmId } = useParams();

  return (
    <div className="chat">
      <div className="chat-header">
        <MemberStatus memberFullName={'John Doe'} status={true} />
        <IconicButton
          Icon={Call_Icon}
          backgroundColor={color.secondary_color}
          afterBgColor={color.good_green}
          width={35}
          iconSize={15}
        />
      </div>
      <div className="chat-content">
        <div className="content-message-List">
          {messagesArray.map(
            ({ messengerName, imgSrc, messageTime, messageContent }, index) => (
              <ContentMessage
                //todo:messageId
                key={index.toString() + messageContent}
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
