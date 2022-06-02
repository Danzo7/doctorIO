import { NavTabMenu } from '@components/tab_menu';
import { Route, Routes } from 'react-router-dom';
import MedicalSessionSideBar from './medical_session_side_bar';
import PrescriptionTab from './pages/prescription_tab';
import './style/index.scss';
interface MedicalSessionProps {}
export default function MedicalSession({}: MedicalSessionProps) {
  return (
    <div className="medical-session">
      <MedicalSessionSideBar />
      <div className="content-container">
        <span>Session</span>
        <NavTabMenu items={['prescription', 'notice']} />
        <Routes>
          <Route path="" element={<PrescriptionTab />} />
        </Routes>
      </div>
    </div>
  );
}
