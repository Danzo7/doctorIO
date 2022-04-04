import React, { useState } from 'react';
import './style/index.scss';
import checked_img from 'toSvg/checked.png';
import checked_disabled_img from 'toSvg/checked_disabled.png';
import unChecked_img from 'toSvg/unChecked.png';
interface ToggleButtonProps {
  disabled: boolean;
}
function ToggleButton({ disabled }: ToggleButtonProps) {
  const [checked, setChecked] = useState(false);
  const swithcToggle = () => {
    if (!disabled) setChecked(!checked);
  };
  return (
    <div className={`toggle-button ${checked ? 'on' : 'off'} `}>
      <div
        onClick={swithcToggle}
        className={`cirle ${disabled ? 'disabled' : ''}`}
      >
        {!disabled && <img src={checked ? checked_img : unChecked_img} />}
        {disabled && (
          <img src={checked ? checked_disabled_img : unChecked_img} />
        )}
      </div>
    </div>
  );
}

export default ToggleButton;
