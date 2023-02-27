import CircleAvatar from '@components/avatars/circle_avatar';
import MemberCard from '@components/member_card';
import { Message } from '@models/local.models';
import { modal, tooltip } from '@libs/overlay';

import { formatRelative } from 'date-fns';
import './style/index.scss';
interface ContentMessageProps {
  message: Message;
  avatar?: string;
  name: string;
  id: number;
  memberId: number;
  status: boolean;
}
function ContentMessage({
  avatar: avatar,
  id: id,
  name: name,
  message,
  memberId,
  status,
}: ContentMessageProps) {
  return (
    <div
      className={`content-message ${
        message.sent && !message.seen ? 'last-message-sent' : ''
      } `}
    >
      <div>
        <CircleAvatar
          src={avatar}
          alt={name + memberId}
          width={40}
          onClick={(e) => {
            if (e)
              tooltip(
                () => (
                  <MemberCard
                    id={id}
                    name={name}
                    avatar={avatar}
                    status={status}
                  />
                ),
                e.currentTarget,
                {
                  clickThrough: true,
                  closeOnBlur: true,
                },
              ).open();
          }}
        />
      </div>

      <div className="info-container">
        <div className="title-container">
          <span
            onClick={(e) => {
              modal(
                () => (
                  <MemberCard
                    id={id}
                    name={name}
                    avatar={avatar}
                    status={status}
                  />
                ),
                {
                  popperTarget: e.currentTarget,
                  clickThrough: true,
                  closeOnBlur: true,
                },
              ).open();
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
