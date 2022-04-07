import React from 'react';
import { css } from '@emotion/css';
import './style/index.scss';
interface IconicButtonProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  backgroundColor?: string;
  afterColor?: string;
  width?: number;
  radius?: number;
}
function IconicButton({
  Icon,
  backgroundColor,
  width = 40,
  afterColor,
  radius,
}: IconicButtonProps) {
  return (
    <div
      className={`iconic-button ${css`
        background-color: ${backgroundColor};
        width: ${width}px;
        height: ${width}px;
        border-radius: ${radius}px;
        &:hover {
          background-color: ${afterColor};
        }
      `}`}
    >
      <Icon height={width / 2} width={width / 2} />
    </div>
  );
}

export default IconicButton;
