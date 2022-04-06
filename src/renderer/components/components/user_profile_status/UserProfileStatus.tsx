import CircleAvatar from '@components/avatars/circle_avatar/CircleAvatar';
import React from 'react';
import './style/index.scss';
interface UserProfileStatusProps {
  img_src: string;
  status: boolean;
  width?: number;
}
function UserProfileStatus({
  img_src,
  status,
  width = 42,
}: UserProfileStatusProps) {
  return (
    <div className="user-profile-status">
      <div className={`dot ${status ? 'online' : 'offline'}`} />
      <CircleAvatar src={img_src} width={width} alt="profile image" />
    </div>
  );
}

export default UserProfileStatus;
