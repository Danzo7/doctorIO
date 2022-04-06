import WelcomeBox from '@components/welcome_box';
import React from 'react';
import './index.scss';
interface AppContentProps {}

function AppContent({}: AppContentProps) {
  return (
    <div className="AppContent">
      <WelcomeBox />
    </div>
  );
}

export default AppContent;
