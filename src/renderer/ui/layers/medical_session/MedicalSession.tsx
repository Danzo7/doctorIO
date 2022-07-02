import { patients } from '@api/fake';
import BorderSeparator from '@components/border_separator';
import { PatientSpecificsCard } from '@components/patient_card';
import TabMenu from '@components/tab_menu';
import MedicalSessionSideBar from './medical_session_side_bar';
import NoticeTab from './pages/notice_tab';
import PrescriptionTab from './pages/prescription_tab';
import SessionParameter from './pages/session_parameter';
import './style/index.scss';
interface MedicalSessionProps {
  patId: number;
}
//REDUX:search patient by id

export default function MedicalSession({ patId }: MedicalSessionProps) {
  const patient = patients.find((pat) => pat.patId == patId);
  return (
    <div className="medical-session">
      <MedicalSessionSideBar patient={patient!} />
      <div className="content-container">
        <span>Session</span>
        <PatientSpecificsCard
          data={{
            'first name': patient?.firstName,
            'last name': patient?.lastName,
            id: patient?.patId,
            age: patient?.age,
          }}
        />
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
