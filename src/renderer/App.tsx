import React from 'react';
import './App.scss';
import AppMenu from '@containers/AppMenu';
import AppContent from '@containers/AppContent';
import AppSidebar from '@containers/AppSidebar';

interface AppProps {}

function App({}: AppProps) {
  return (
    <>
      <div className="app-container">
        <AppMenu />
        <AppContent />
        <AppSidebar />
      </div>
      <div className="overlay-container"></div>
    </>
  );
}

export default App;
