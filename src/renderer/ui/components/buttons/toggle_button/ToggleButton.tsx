import { useState } from 'react';
import './style/index.scss';
import XMark from 'toSvg/x_mark.svg?icon';
import GoodMark from 'toSvg/good_mark.svg?icon';
import { css } from '@emotion/css';
interface ToggleButtonProps {
  disabled?: boolean;
  isChecked?: boolean;
  size?: number;
  withIcons?: boolean;
  onChange?: (isChecked: boolean) => void;
}
function ToggleButton({
  disabled,
  isChecked,
  size = 40,
  withIcons = true,
  onChange,
}: ToggleButtonProps) {
  const [checked, setChecked] = useState(isChecked ?? false);

  const Svg = checked ? GoodMark : XMark;
  const switchToggle = () => {
    if (!disabled) {
      setChecked(!checked);
      onChange?.(!checked);
    }
  };
  return (
    <div
      className={`toggle-button ${checked ? 'on' : 'off'} ${
        disabled ? 'disabled' : ''
      }
      ${css`
        width: ${size}px;
      `}
       `}
      onClick={switchToggle}
    >
      <div
        className={`circle  ${css`
          width: ${size / 2}px;
          height: ${size / 2}px;
        `}`}
      >
        {withIcons && <Svg width={size / 4} height={size / 4} />}
      </div>
    </div>
  );
}

export default ToggleButton;
