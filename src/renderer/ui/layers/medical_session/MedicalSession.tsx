import { patients } from '@api/fake';
import BorderSeparator from '@components/border_separator';
import TabMenu from '@components/tab_menu';
import { Patient } from '@models/instance.model';
import MedicalSessionSideBar from './medical_session_side_bar';
import NoticeTab from './pages/notice_tab';
import PrescriptionTab from './pages/prescription_tab';
import SessionParameter from './pages/session_parameter';
import './style/index.scss';
interface MedicalSessionProps {
  patId: number;
}
//todo:redux-fetch-data
export const patient: Patient = patients[0];
export default function MedicalSession({ patId }: MedicalSessionProps) {
  return (
    <div className="medical-session">
      <MedicalSessionSideBar patient={patient} />
      <div className="content-container">
        <span>Session</span>
        <TabMenu items={['prescription', 'notice']}>
          <PrescriptionTab />
          <NoticeTab />
        </TabMenu>
        <BorderSeparator direction="horizontal" />
        <SessionParameter />
      </div>
    </div>
  );
}
