import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app-mount'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
//Snowpack HMR
if (typeof import.meta !== 'undefined' && import.meta.hot) {
  import.meta.hot.accept();
} 
//Webpack HMR
if (typeof module !== 'undefined' && module.hot) {
  module.hot.accept(function (err) {
    console.log('An error occurred while accepting new version');
  });

  module.hot.addStatusHandler(status => {
    if (status === 'prepare') console.clear();
  });
}
