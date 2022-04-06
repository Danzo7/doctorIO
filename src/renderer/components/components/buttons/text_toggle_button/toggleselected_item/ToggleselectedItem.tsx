import React from 'react';
import './style/index.scss';
interface ToggleselectedItemProps {
  text: string;
  separator_direction: string;
}
function ToggleselectedItem({
  text,
  separator_direction,
}: ToggleselectedItemProps) {
  return (
    <div className="toggleselected-item">
      {separator_direction == 'right' && (
        <>
          <div className="span-container">
            <span>{text}</span>
          </div>
          <div className="separator"></div>
        </>
      )}
      {separator_direction == 'left' && (
        <>
          <div className="separator"></div>
          <div className="span-container">
            <span>{text}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default ToggleselectedItem;
