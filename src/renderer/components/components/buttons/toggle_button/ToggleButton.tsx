import React, { useState } from 'react';
import './style/index.scss';
import XMark from 'toSvg/x_mark.svg';
import GoodMark from 'toSvg/good_mark.svg';
interface ToggleButtonProps {
  disabled: boolean;
  isChecked?: boolean;
}
function ToggleButton({ disabled, isChecked }: ToggleButtonProps) {
  const [checked, setChecked] = useState(isChecked ?? false);

  const Svg = checked ? GoodMark : XMark;
  const switchToggle = () => {
    if (!disabled) setChecked(!checked);
  };
  return (
    <div
      className={`toggle-button ${checked ? 'on' : 'off'} ${
        disabled ? 'disabled' : ''
      }`}
      onClick={switchToggle}
    >
      <div className={`circle `}>
        <Svg />
      </div>
    </div>
  );
}

export default ToggleButton;
