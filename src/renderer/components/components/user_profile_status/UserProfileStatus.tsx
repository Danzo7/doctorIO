import CircleAvatar from '@components/avatars/circle_avatar/CircleAvatar';
import React from 'react';
import './style/index.scss';
interface UserProfileStatusProps {
  img_src: string;
  status: boolean;
}
function UserProfileStatus({ img_src, status }: UserProfileStatusProps) {
  return (
    <div className="user-profile-status">
      <div className={`dot ${status ? 'online' : 'offline'}`} />
      <CircleAvatar src={img_src} width="42px" alt="profile image" />
    </div>
  );
}

export default UserProfileStatus;
