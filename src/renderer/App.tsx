import './App.scss';
import {
  DEFAULT_MODAL,
  OverlayContainer,
  PortalContainer,
} from '@libs/overlay';
import { Route, Routes } from 'react-router-dom';
import MedicalSession from '@layers/medical_session';
import MainLayer from '@layers/main_layer';
import Clinic from '@containers/AppContent/pages/clinic';
import { useAppSelector } from '@store';
import { ModalPortal } from '@libs/overlay/OverlayContainer';
import UserRegister from '@containers/modals/user_regisiter';

interface AppProps {}

function App({}: AppProps) {
  const user = useAppSelector((state) => state.user);
  console.log('User :', user);

  return (
    <>
      <div className="app-container">
        {
          user?.username ? (
            user?.selectedClinic ? ( //FEATURE try to connect to selected clinic
              <Routes>
                <Route path="session" element={<MedicalSession />} />
                <Route path="*" element={<MainLayer />} />
              </Routes>
            ) : (
              <Clinic />
            )
          ) : (
            <UserRegister />
          ) //UI fix the modal setup
        }
      </div>
      <OverlayContainer />
      <PortalContainer />
    </>
  );
}

export default App;
