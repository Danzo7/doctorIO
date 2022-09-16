import CircleAvatar from '@components/avatars/circle_avatar/CircleAvatar';
import { MouseEventHandler } from 'react';
import './style/index.scss';

interface UserProfileStatusProps {
  imgSrc?: string;
  status?: boolean;
  width?: number;
  avatarRadius?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  alt: string;
}
function UserProfileStatus({
  imgSrc,
  status,
  width = 42,
  avatarRadius,
  onClick,
  alt,
}: UserProfileStatusProps) {
  return (
    <div className="user-profile-status">
      {status != undefined && (
        <div
          className={`dot ${status ? 'online' : 'offline'}`}
          css={{
            width: width / 4,
            height: width / 4,
            left: width / 4.2,
          }}
        />
      )}
      <CircleAvatar
        src={imgSrc}
        width={width}
        radius={avatarRadius}
        onClick={onClick}
        alt={alt}
      />
    </div>
  );
}

export default UserProfileStatus;
