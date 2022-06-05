import './App.scss';
import AppMenu from '@containers/AppMenu';
import AppContent from '@containers/AppContent';
import AppSidebar from '@containers/AppSidebar';
import { OverlayContainer } from '@libs/overlay';

interface AppProps {}

function App({}: AppProps) {
  return (
    <>
      <div className="app-container">
        <AppMenu />
        <AppContent />
        <AppSidebar />
      </div>
      <OverlayContainer />
    </>
  );
}

export default App;
