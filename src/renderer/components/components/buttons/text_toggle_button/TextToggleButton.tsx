import React, { useState } from 'react';
import './style/index.scss';
import ToggleselectedItem from './toggleselected_item';
interface TextToggleButtonProps {
  first_text: string;
  second_text: string;
  default_select?: string;
}
/**
 * @deprecated Deprecated in favor of MultiOptionSwitcher
 */
function TextToggleButton({
  first_text,
  second_text,
  default_select,
}: TextToggleButtonProps) {
  const [selected, setselected] = useState(default_select);
  return (
    <div className="text-toggle-button">
      {selected == 'first' && (
        <>
          <ToggleselectedItem text={first_text} separator_direction="right" />
          <div onClick={() => setselected('second')} className="span-container">
            <span>{second_text}</span>
          </div>
        </>
      )}
      {selected == 'second' && (
        <>
          <div onClick={() => setselected('first')} className="span-container">
            <span>{first_text}</span>
          </div>
          <ToggleselectedItem text={second_text} separator_direction="left" />
        </>
      )}
    </div>
  );
}

export default TextToggleButton;
