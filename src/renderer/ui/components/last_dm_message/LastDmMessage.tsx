import UserProfileStatus from '@components/user_profile_status';
import { NavLink } from 'react-router-dom';
import './style/index.scss';
interface LastDmMessageProps {
  imgSrc: string;
  status: boolean;
  lastMessage: string;
}
export default function LastDmMessage({
  imgSrc,
  status,
  lastMessage,
}: LastDmMessageProps) {
  return (
    <NavLink to={'tobe'} className="last-dm-message">
      <UserProfileStatus imgSrc={imgSrc} status={status} width={35} />
      <div className="info-container">
        <span>Mahmoud Benaissa</span>
        <span>{`You: ${lastMessage ? lastMessage : ''}`}</span>
      </div>
    </NavLink>
  );
}
