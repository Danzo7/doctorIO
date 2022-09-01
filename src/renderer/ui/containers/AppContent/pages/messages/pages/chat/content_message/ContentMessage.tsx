import CircleAvatar from '@components/avatars/circle_avatar';
import MemberCard from '@components/member_card';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Message } from '@models/local.models';
import { formatRelative } from 'date-fns';
import './style/index.scss';
interface ContentMessageProps {
  message: Message;
  avatar?: string;
  name: string;
  id: number;
  memberId: number;
}
function ContentMessage({
  avatar: avatar,
  id: id,
  name: name,
  message,
  memberId,
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
          src={avatar}
          alt={name + memberId}
          width={40}
          onClick={(e) => {
            open(<MemberCard id={id} name={name} avatar={avatar} />, {
              popperTarget: e.currentTarget,
              clickThrough: true,
              closeOnBlur: true,
            });
          }}
        />
      </div>

      <div className="info-container">
        <div className="title-container">
          <span
            onClick={(e) => {
              open(<MemberCard id={id} name={name} avatar={avatar} />, {
                popperTarget: e.currentTarget,
                clickThrough: true,
                closeOnBlur: true,
              });
            }}
          >
            {name}
          </span>
          <span>{formatRelative(message.date, new Date())}</span>
        </div>
        <span>{message.text}</span>
      </div>
    </div>
  );
}

export default ContentMessage;
