import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.scss';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app-mount'),
);

if (typeof module !== 'undefined' && module.hot) {
  module.hot.accept(function () {
    console.error('An error occurred while accepting new version');
  });

  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') console.clear();
  });
}
