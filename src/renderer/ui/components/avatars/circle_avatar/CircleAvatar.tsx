import { AVATAR_DEFAULT } from '@constants/resources';
import { MouseEventHandler } from 'react';
import './style/index.scss';

interface CircleAvatarProps {
  src?: string;
  width: number;
  alt?: string;
  radius?: number | string;
  border?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
function CircleAvatar({
  src = AVATAR_DEFAULT,
  width,
  alt,
  radius = '100%',
  border,
  onClick,
}: CircleAvatarProps) {
  return (
    <div
      className={`circle-avatar ${onClick ? 'clickable' : ''}`}
      css={{
        borderRadius: radius,
        border: border,
      }}
      onClick={onClick}
    >
      <img
        css={{
          width: width,
        }}
        src={src}
        alt={alt}
      />
    </div>
  );
}

export default CircleAvatar;
