import Timer from '@components/timer';
import WelcomeBox from '@components/welcome_box';
import React from 'react';
import './index.scss';
interface AppContentProps {}

function AppContent({}: AppContentProps) {
  return (
    <div className="AppContent">
      <WelcomeBox />
      <Timer pNum={1} ratio={10}></Timer>
    </div>
  );
}

export default AppContent;
