import './App.scss';
import AppMenu from '@containers/AppMenu';
import AppContent from '@containers/AppContent';
import AppSidebar from '@containers/AppSidebar';
import { OverlayContainer } from '@libs/overlay';
import { Route, Routes } from 'react-router-dom';
import MedicalSession from '@layers/medical_session';

interface AppProps {}

function App({}: AppProps) {
  return (
    <>
      <div className="app-container">
        <Routes>
          <Route path="session" element={<MedicalSession patId={1} />} />
          <Route
            path="*"
            element={
              <>
                <AppMenu />
                <AppContent />
                <AppSidebar />
              </>
            }
          />
        </Routes>
      </div>
      <OverlayContainer />
    </>
  );
}

export default App;
