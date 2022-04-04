import React from 'react';
import './style/index.scss';
interface TextToggleButtonProps {}
function TextToggleButton({}: TextToggleButtonProps) {
  return (
    <div className="text-toggle-button">
      <div className="span-container">
        <span>UnSelected</span>
      </div>
      <div className={`span-container selected`}>
        <div className="separator"></div>
        <span>Selected</span>
      </div>
    </div>
  );
}

export default TextToggleButton;
