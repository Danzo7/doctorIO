import React from 'react';
import { css } from '@emotion/css';
import './style/index.scss';

interface IconicButtonProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  backgroundColor?: string;
  afterColor?: string;
  width?: number;
  iconSize?: number;
  radius?: number;
}

/**
 * @param {number} iconSize -Size of icon if ?icon query is used, Default=35vw
 * @param {number} width -Size of button use ?icon query for dynamic icon size*/
function IconicButton({
  Icon,
  backgroundColor,
  width = 40,
  afterColor,
  radius,
  iconSize,
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
      <Icon height={iconSize ?? width / 2} width={iconSize ?? width / 2} />
    </div>
  );
}

export default IconicButton;
