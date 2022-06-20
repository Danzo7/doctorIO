import CircleAvatar from '@components/avatars/circle_avatar';
import MemberCard from '@components/member_card';
import { Overlay } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import './style/index.scss';
interface ContentMessageProps {
  imgSrc: string;
  messengerName: string;
  messageTime: string;
  messageContent: string;
  isLastMessageSent: boolean;
}
function ContentMessage({
  messengerName,
  messageTime,
  messageContent,
  imgSrc,
  isLastMessageSent,
}: ContentMessageProps) {
  const { open } = useOverlay();
  return (
    <div
      className={`content-message ${
        isLastMessageSent ? 'last-message-sent' : ''
      } `}
    >
      <div>
        <CircleAvatar
          src={imgSrc}
          width={40}
          onClick={(e) => {
            open(
              <MemberCard
                imgSrc={imgSrc}
                fullName={messengerName}
                roleArray={['a', 'b']}
              />,
              {
                popperTarget: e.currentTarget,
                clickThrough: true,
                closeOnBlur: true,
              },
            );
          }}
        />
      </div>

      <div className="info-container">
        <div className="title-container">
          <span
            onClick={(e) => {
              open(
                <MemberCard
                  imgSrc={imgSrc}
                  fullName={messengerName}
                  roleArray={['a', 'b']}
                />,
                {
                  popperTarget: e.currentTarget,
                  clickThrough: true,
                  closeOnBlur: true,
                },
              );
            }}
          >
            {messengerName}
          </span>
          <span>{messageTime}</span>
        </div>
        <span>{messageContent}</span>
      </div>
    </div>
  );
}

export default ContentMessage;
