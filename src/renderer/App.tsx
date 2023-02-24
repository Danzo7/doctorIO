import './App.scss';

import StartupLayer from '@layers/startup_layer';
import { OverlayContainer } from '@libs/overlay/OverlayContainer';
import { useAppSettingsStore } from '@stores/appSettingsStore';

interface AppProps {}

function App({}: AppProps) {
  const state = useAppSettingsStore();
  return (
    <>
      <div
        className={
          'app-container ' + (state.theme === 'drakula' ? ' drakula' : '')
        }
        css={IS_DESKTOP ? { paddingTop: 30 } : {}}
      >
        <StartupLayer />
      </div>
      <OverlayContainer />
    </>
  );
}

export default App;
