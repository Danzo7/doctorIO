import React from 'react';
import './style/index.scss';
interface UserProfileStatusProps {
  img_src: string;
  status: boolean;
}
function UserProfileStatus({ img_src, status }: UserProfileStatusProps) {
  return (
    <div className="user-profile-status">
      <div className={status ? 'online' : 'offline'}></div>
      <img src={img_src} alt="profile image" />
    </div>
  );
}

export default UserProfileStatus;
