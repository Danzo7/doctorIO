import React from 'react';
import './style/index.scss';
import Add from 'toSvg/add.svg';
interface AddButtonProps {}
function AddButton({}: AddButtonProps) {
  return (
    <div className="add-button">
      <Add />
    </div>
  );
}

export default AddButton;
