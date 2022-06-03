import BorderSeparator from '@components/border_separator';
import TabMenu from '@components/tab_menu';
import MedicalSessionSideBar from './medical_session_side_bar';
import PrescriptionTab from './pages/prescription_tab';
import SessionParameter from './pages/session_parameter';
import './style/index.scss';
interface MedicalSessionProps {}
export default function MedicalSession({}: MedicalSessionProps) {
  return (
    //todo:TabMenu
    <div className="medical-session">
      <MedicalSessionSideBar />
      <div className="content-container">
        <span>Session</span>
        <TabMenu items={['prescription', 'notice']}>
          <PrescriptionTab />
          <SessionParameter />
        </TabMenu>
        <BorderSeparator direction="horizontal" />
        <SessionParameter />
      </div>
    </div>
  );
}
