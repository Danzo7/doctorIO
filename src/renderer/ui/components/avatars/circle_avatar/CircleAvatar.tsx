import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import multiavatar from '@multiavatar/multiavatar';
import './style/index.scss';
import SVG from 'react-inlinesvg';
import { mavatar } from '@libs/mavatar';

interface CircleAvatarProps {
  src?: string;
  width: number;
  alt: string;
  radius?: number | string;
  border?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
function CircleAvatar({
  src,
  width,
  alt,
  radius = '100%',
  border,
  onClick,
}: CircleAvatarProps) {
  const [avatar, setAvatar] = useState<string>('default');
  useEffect(() => {
    if (!alt) return;
    (async () => setAvatar(await mavatar(alt, 'square')))();
  }, [alt]);
  return (
    <div
      className={`circle-avatar ${onClick ? 'clickable' : ''}`}
      css={{
        borderRadius: radius,
        border: border,
      }}
      onClick={onClick}
    >
      {src ? (
        <img
          css={{
            width: width,
            height: width,
          }}
          src={src}
          alt={alt}
        />
      ) : (
        <SVG src={avatar} width={width} />
      )}
    </div>
  );
}

export default CircleAvatar;
