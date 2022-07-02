import CircleAvatar from '@components/avatars/circle_avatar';
import MemberCard from '@components/member_card';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Message } from '@models/local.models';
import { formatRelative } from 'date-fns';
import './style/index.scss';
interface ContentMessageProps {
  message: Message;
  dmAvatar?: string;
  dmName: string;
  dmId: number;
  memberId: number;
}
function ContentMessage({
  dmAvatar,
  dmId,
  dmName,
  message,
}: ContentMessageProps) {
  const { open } = useOverlay();
  return (
    <div
      className={`content-message ${
        message.seen && !message.seen ? 'last-message-sent' : ''
      } `}
    >
      <div>
        <CircleAvatar
          src={dmAvatar}
          width={40}
          onClick={(e) => {
            open(
              <MemberCard memberId={dmId} name={dmName} avatar={dmAvatar} />,
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
                <MemberCard memberId={dmId} name={dmName} avatar={dmAvatar} />,
                {
                  popperTarget: e.currentTarget,
                  clickThrough: true,
                  closeOnBlur: true,
                },
              );
            }}
          >
            {dmName}
          </span>
          <span>{formatRelative(message.date, new Date())}</span>
        </div>
        <span>{message.text}</span>
      </div>
    </div>
  );
}

export default ContentMessage;
