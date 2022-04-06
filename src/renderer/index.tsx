import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';

const container = document.getElementById('app-mount');
const root = createRoot(container as HTMLElement);
root.render(<App />);

if (typeof module !== 'undefined' && module.hot) {
  module.hot.accept(function () {
    console.error('An error occurred while accepting new version');
  });

  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') console.clear();
  });
}
