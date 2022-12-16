import './App.scss';
import { OverlayContainer, PortalContainer } from '@libs/overlay';

import StartupLayer from '@layers/startup_layer';
import { OverlayContainer_Unstable } from '@libs/overlay/OverlayContainer';
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
        css={FROM_ELECTRON ? { paddingTop: 30 } : {}}
      >
        <StartupLayer />
      </div>
      <OverlayContainer />
      <OverlayContainer_Unstable />
      <PortalContainer />
    </>
  );
}

export default App;
