import React from 'react';
import { css } from '@emotion/css';
import './style/index.scss';
interface IconicButtonProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  backgroundColor?: string;
  afterColor?: string;
  size?: number;
  width?: number;
}
function IconicButton({
  Icon,
  backgroundColor,
  size,
  width,
  afterColor,
}: IconicButtonProps) {
  return (
    <div
      className={`iconic-button ${css`
        background-color: ${backgroundColor};
        padding: ${size}%;
        width: ${width}px;
        height: ${width}px;
        &:hover {
          background-color: ${afterColor};
        }
      `}`}
    >
      <Icon />
    </div>
  );
}

export default IconicButton;
