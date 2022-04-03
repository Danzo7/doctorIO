import React from 'react';
import './style/index.scss';
interface SimpleAvatarProps {
  img_src: string;
}
function SimpleAvatar({ img_src }: SimpleAvatarProps) {
  return (
    <div className="simple-avatar">
      <img src={img_src} alt="profile image" />
    </div>
  );
}

export default SimpleAvatar;
