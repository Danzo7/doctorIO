import './App.scss';
import { OverlayContainer } from '@libs/overlay';
import { Route, Routes } from 'react-router-dom';
import MedicalSession from '@layers/medical_session';
import MainLayer from '@layers/main_layer';
import { firstUser } from '@api/fake';
import Clinic from '@containers/AppContent/pages/clinic';

interface AppProps {}

function App({}: AppProps) {
  const user = firstUser; //REDUX load user

  return (
    <>
      <div className="app-container">
        {
          user ? (
            user.selectedClinic ? ( //FEATURE try to connect to selected clinic
              <Routes>
                <Route path="session" element={<MedicalSession patId={1} />} />
                <Route path="*" element={<MainLayer />} />
              </Routes>
            ) : (
              <Clinic />
            )
          ) : (
            <div>
              <h1>It seems like this is your first time using this app</h1>
            </div>
          ) //UI FOR FIRST TIME USER
        }
      </div>
      <OverlayContainer />
    </>
  );
}

export default App;
