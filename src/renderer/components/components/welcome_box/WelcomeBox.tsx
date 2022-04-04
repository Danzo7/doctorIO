import React from 'react';
import './style/index.scss';
import Svg from 'toSvg/doctor_face.svg';
import Arrow from 'toSvg/arrow.svg';

interface WelcomeBoxProps {}
function WelcomeBox({}: WelcomeBoxProps) {
  return (
    <div className="welcome-box">
      <div className="content">
        <Svg />
        <span>Welcome to marely</span>
      </div>
      <div className="hide-btn">
        <Arrow />
      </div>
      {/* <Pattern /> */}
    </div>
  );
}

export default WelcomeBox;
