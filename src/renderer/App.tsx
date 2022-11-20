import './App.scss';
import { OverlayContainer, PortalContainer } from '@libs/overlay';

import StartupLayer from '@layers/startup_layer';
import { OverlayContainer_Unstable } from '@libs/overlay/OverlayContainer';

interface AppProps {}

function App({}: AppProps) {
  return (
    <>
      <div
        className="app-container"
        css={FROM_ELECTRON ? { paddingTop: 30 } : {}}
      >
        <StartupLayer />
      </div>
      <OverlayContainer_Unstable />
      <OverlayContainer />
      <PortalContainer />
    </>
  );
}

export default App;
