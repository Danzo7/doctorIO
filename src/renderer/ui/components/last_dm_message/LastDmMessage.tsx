import UserProfileStatus from '@components/user_profile_status';
import { Message } from '@models/local.models';
import { NavLink } from 'react-router-dom';
import './style/index.scss';

interface LastDmMessageProps {
  avatar?: string;
  status?: boolean;
  lastMessage: Message;
  dmName: string;
  id: number;
}
export default function LastDmMessage({
  avatar,
  status,
  lastMessage,
  id,
  dmName,
}: LastDmMessageProps) {
  return (
    <NavLink
      to={id?.toString() ?? ''}
      className={({ isActive }) =>
        ` last-dm-message${isActive ? ' selected' : ''}`
      }
    >
      <UserProfileStatus imgSrc={avatar} status={status} width={35} />
      <div className="info-container">
        <span>{dmName}</span>
        <span>{`${lastMessage?.sent && 'you:'} ${lastMessage.text}`}</span>
      </div>
    </NavLink>
  );
}
