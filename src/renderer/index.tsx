/* eslint-disable no-console */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';

const app = document.getElementById('app-mount');
const root = createRoot(app as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

if (typeof module !== 'undefined' && module.hot) {
  module.hot.accept(function () {
    console.error('An error occurred while accepting new version');
  });

  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') console.clear();
  });
}
