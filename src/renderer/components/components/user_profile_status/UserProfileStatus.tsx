import CircleAvatar from '@components/avatars/circle_avatar/CircleAvatar';
import { css } from '@emotion/css';
import React from 'react';
import './style/index.scss';
interface UserProfileStatusProps {
  imgSrc: string;
  status: boolean;
  width?: number;
  avatarRadius?: number;
}
function UserProfileStatus({
  imgSrc,
  status,
  width = 42,
  avatarRadius,
}: UserProfileStatusProps) {
  return (
    <div className="user-profile-status">
      <div
        className={`dot ${css`
          width: ${width / 4}px;
          height: ${width / 4}px;
          left: ${width / 4.2}px;
        `} ${status ? 'online' : 'offline'}`}
      />
      <CircleAvatar
        src={imgSrc}
        width={width}
        alt="profile image"
        radius={avatarRadius}
      />
    </div>
  );
}

export default UserProfileStatus;
