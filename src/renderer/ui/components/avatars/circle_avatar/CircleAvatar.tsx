import { MouseEventHandler, useEffect, useState } from 'react';
import './style/index.scss';
import SVG from 'react-inlinesvg';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';
import { useConnectionStore } from '@stores/ConnectionStore';
import { AVATAR_PATH } from '@constants/resources';

interface CircleAvatarProps {
  src?: string;
  width: number;
  alt: string;
  radius?: number | string;
  border?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  direct?: boolean;
}
function CircleAvatar({
  src,
  width,
  alt,
  radius = '100%',
  border,
  onClick,
  direct,
}: CircleAvatarProps) {
  const avatar = createAvatar(style, {
    seed: alt,
  });
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (isError) setIsError(false);
    else return;
  }, [isError, src]);
  return (
    <div
      className={`circle-avatar ${onClick ? 'clickable' : ''}`}
      css={{
        borderRadius: radius,
        border: border,
      }}
      onClick={onClick}
    >
      {src && !isError ? (
        <img
          css={{
            width: width,
            height: width,
          }}
          src={
            (!direct
              ? useConnectionStore.getState().getUrl() + AVATAR_PATH
              : '') + src
          }
          onError={() => {
            setIsError(true);
          }}
          alt={alt}
        />
      ) : (
        <SVG src={avatar} width={width} />
      )}
    </div>
  );
}

export default CircleAvatar;
