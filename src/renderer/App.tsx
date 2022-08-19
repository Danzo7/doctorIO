import './App.scss';
import { OverlayContainer } from '@libs/overlay';
import { Route, Routes } from 'react-router-dom';
import MedicalSession from '@layers/medical_session';
import MainLayer from '@layers/main_layer';
import Clinic from '@containers/AppContent/pages/clinic';
import { useAppDispatch, useAppSelector } from '@store';
import { User } from '@models/local.models';
import { setUser } from '@redux/local/user/userSlice';
import TextButton from '@components/buttons/text_button';

interface AppProps {}

function App({}: AppProps) {
  const { user } = useAppSelector((state) => state.user);
  console.log('User :', user);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="app-container">
        {
          user ? (
            user?.selectedClinic ? ( //FEATURE try to connect to selected clinic
              <Routes>
                <Route path="session" element={<MedicalSession />} />
                <Route path="*" element={<MainLayer />} />
              </Routes>
            ) : (
              <Clinic />
            )
          ) : (
            <div>
              <TextButton
                text="click"
                onPress={() => {
                  dispatch(setUser());
                }}
              />
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
