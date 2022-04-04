import React from 'react';
import './style/index.scss';
import BackSvg from 'toSvg/back-button.svg';

interface BackButtonProps {
  onClick: () => void;
}

function BackButton({}: BackButtonProps) {
  return (
    <div className="back-button">
      <BackSvg />
    </div>
  );
}

export default BackButton;
