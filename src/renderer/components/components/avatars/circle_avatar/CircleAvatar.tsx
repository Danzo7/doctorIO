import React from 'react';
import './style/index.scss';
import { css } from '@emotion/css';
interface CircleAvatarProps {
  src: string;
  width: string;
  alt?: string;
}
function CircleAvatar({ src, width, alt }: CircleAvatarProps) {
  return (
    <div className="circle-avatar">
      <img
        className={css`
          width: ${width};
        `}
        src={src}
        alt={alt}
      />
    </div>
  );
}

export default CircleAvatar;
