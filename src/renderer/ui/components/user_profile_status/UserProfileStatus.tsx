import CircleAvatar from '@components/avatars/circle_avatar/CircleAvatar';
import { MouseEventHandler } from 'react';
import './style/index.scss';
interface UserProfileStatusProps {
  imgSrc: string;
  status: boolean;
  width?: number;
  avatarRadius?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
function UserProfileStatus({
  imgSrc,
  status,
  width = 42,
  avatarRadius,
  onClick,
}: UserProfileStatusProps) {
  return (
    <div className="user-profile-status">
      <div
        className={`dot ${status ? 'online' : 'offline'}`}
        css={{
          width: width / 4,
          height: width / 4,
          left: width / 4.2,
        }}
      />
      <CircleAvatar
        src={imgSrc}
        width={width}
        alt="profile image"
        radius={avatarRadius}
        onClick={onClick}
      />
    </div>
  );
}

export default UserProfileStatus;
