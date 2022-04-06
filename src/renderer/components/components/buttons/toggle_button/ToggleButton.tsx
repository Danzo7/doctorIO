import React, { useState } from 'react';
import './style/index.scss';
import XMark from 'toSvg/x_mark.svg';
import GoodMark from 'toSvg/good_mark.svg';
import { css } from '@emotion/css';
interface ToggleButtonProps {
  disabled: boolean;
  isChecked?: boolean;
  size?: number;
}
function ToggleButton({ disabled, isChecked, size }: ToggleButtonProps) {
  const [checked, setChecked] = useState(isChecked ?? false);

  const Svg = checked ? GoodMark : XMark;
  const switchToggle = () => {
    if (!disabled) setChecked(!checked);
  };
  return (
    <div
      className={`toggle-button ${checked ? 'on' : 'off'} ${
        disabled ? 'disabled' : ''
      }
      ${css`
        width: ${size ?? 40}px;
      `}
       `}
      onClick={switchToggle}
    >
      <div
        className={`circle  ${css`
          width: ${(size ?? 40) / 2}px;
          height: ${(size ?? 40) / 2}px;
        `}`}
      >
        <Svg />
      </div>
    </div>
  );
}

export default ToggleButton;
