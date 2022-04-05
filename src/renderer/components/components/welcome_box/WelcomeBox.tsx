import React, { useState } from 'react';
import './style/index.scss';
import Svg from 'toSvg/doctor_face.svg';
import Arrow from 'toSvg/arrow.svg';
import LinkyIcon from '@components/LinkyIcon';

interface WelcomeBoxProps {}
function WelcomeBox({}: WelcomeBoxProps) {
  const [close, setClose] = useState({ isHidding: false, isHidden: false });
  return !close.isHidden ? (
    <div
      className={`welcome-box ${close.isHidding ? 'animate' : ''}`}
      onAnimationEnd={() => {
        setClose({ isHidding: true, isHidden: true });
      }}
    >
      <div className="content">
        <Svg />
        <span>Welcome to marely</span>
      </div>
      <div
        className="hide-btn"
        onClick={() => {
          setClose({ isHidding: true, isHidden: false });
        }}
      >
        <LinkyIcon Src={Arrow} width="30px" viewBox="0 -27 9 73"></LinkyIcon>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default WelcomeBox;
