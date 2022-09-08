/* eslint-disable no-console */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import { Provider } from 'react-redux';
import { persistor, store } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Taskbar from '@components/taskbar';

declare const FROM_ELECTRON: boolean;
const app = document.getElementById('app-mount');
const root = createRoot(app as HTMLElement);
const Routing = FROM_ELECTRON ? HashRouter : BrowserRouter;

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {FROM_ELECTRON && <Taskbar />}

        <Routing>
          <App />
        </Routing>
      </PersistGate>
    </Provider>
  </StrictMode>,
);

// if (typeof module !== 'undefined' && module.hot) {
//   module.hot.accept(function () {
//     console.error('An error occurred while accepting new version');
//   });

//   module.hot.addStatusHandler((status) => {
//     if (status === 'prepare') console.clear();
//   });
// }
