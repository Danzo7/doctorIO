import './style/index.scss';
import { css } from '@emotion/css';
interface CircleAvatarProps {
  src: string;
  width: number;
  alt?: string;
  radius?: number;
}
function CircleAvatar({ src, width, alt, radius }: CircleAvatarProps) {
  return (
    <div
      className={`circle-avatar ${css`
        border-radius: ${radius}px;
      `}`}
    >
      <img
        className={css`
          width: ${width}px;
        `}
        src={src}
        alt={alt}
      />
    </div>
  );
}

export default CircleAvatar;
