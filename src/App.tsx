import React, { useState } from 'react';
import './App.scss';
import './assets/styles/_appColors.scss';
import AppMenu from '@containers/AppMenu';
import AppContent from '@containers/AppContent';
import AppSidebar from '@containers/AppSidebar';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="tona appContainer ">
      <AppMenu />
      <AppContent />
      <AppSidebar />
    </div>
  );
}

export default App;
