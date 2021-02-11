import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import AppMenu from './components/AppMenu';
interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="appContainer">
      <AppMenu />
    </div>
  );
}

export default App;
