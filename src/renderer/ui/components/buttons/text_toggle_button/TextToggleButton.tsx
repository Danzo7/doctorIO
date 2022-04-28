import { useState } from 'react';
import './style/index.scss';
import ToggleselectedItem from './toggleselected_item';
interface TextToggleButtonProps {
  firstText: string;
  secondText: string;
  defaultSelect?: string;
}
/**
 * @deprecated Deprecated in favor of MultiOptionSwitcher
 */
function TextToggleButton({
  firstText,
  secondText,
  defaultSelect,
}: TextToggleButtonProps) {
  const [selected, setselected] = useState(defaultSelect);
  return (
    <div className="text-toggle-button">
      {selected == 'first' && (
        <>
          <ToggleselectedItem text={firstText} separatorDirection="right" />
          <div onClick={() => setselected('second')} className="span-container">
            <span>{secondText}</span>
          </div>
        </>
      )}
      {selected == 'second' && (
        <>
          <div onClick={() => setselected('first')} className="span-container">
            <span>{firstText}</span>
          </div>
          <ToggleselectedItem text={secondText} separatorDirection="left" />
        </>
      )}
    </div>
  );
}

export default TextToggleButton;
