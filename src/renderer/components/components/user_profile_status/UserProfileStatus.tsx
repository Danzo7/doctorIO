import CircleAvatar from '@components/avatars/circle_avatar/CircleAvatar';
import React from 'react';
import './style/index.scss';
interface UserProfileStatusProps {
  imgSrc: string;
  status: boolean;
  width?: number;
}
function UserProfileStatus({
  imgSrc,
  status,
  width = 42,
}: UserProfileStatusProps) {
  return (
    <div className="user-profile-status">
      <div className={`dot ${status ? 'online' : 'offline'}`} />
      <CircleAvatar src={imgSrc} width={width} alt="profile image" />
    </div>
  );
}

export default UserProfileStatus;
