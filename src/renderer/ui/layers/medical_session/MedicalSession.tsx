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
export const patient: Patient = {
  patId: 1,
  gender: 'male',
  appointments: [
    {
      assistantId: 2,
      doctorId: 1,
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
      id: 2,
      state: 'upcoming',
      bookDate: new Date('2022-01-01'),
    },
    {
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
      assistantId: 2,
      doctorId: 1,
      id: 1,
      state: 'done-booked',
      bookDate: new Date('2022-01-01'),
      date: new Date('2022-01-01'),
      sessionId: 1,
      subject: 'Inner bleed',
    },
    {
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
      assistantId: 2,
      doctorId: 1,
      id: 2,
      state: 'done',
      date: new Date('2022-01-01'),
      sessionId: 4,
      subject: 'Inner bleed',
    },
    {
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
      assistantId: 2,
      doctorId: 1,
      id: 2,
      state: 'missed',
      bookDate: new Date('2022-02-01'),
    },
    {
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
      assistantId: 2,
      doctorId: 1,
      id: 2,
      state: 'done',
      date: new Date('2022-04-04'),
      sessionId: 1,
      subject: 'Inner bleed',
    },
  ],
  medicalHistory: [
    {
      id: 1,
      description: 'had a noise pain',
      date: new Date('2022-01-01'),
    },
    {
      id: 2,
      description: 'had a noise pain',
      date: new Date('2022-01-01'),
    },
    {
      id: 3,
      description: 'had a noise pain',
      date: new Date('2022-01-01'),
    },
    {
      id: 4,
      description: 'had a noise pain',
      date: new Date('2022-01-01'),
    },
  ],
  status: 'active',
  medicalDocuments: [
    {
      fileId: 1,
      fileName: 'file1.pdf',
      fileType: 'pdf',
      date: new Date('2022-01-01'),
      filePath: '',
      fileSize: 3000,
    },
    {
      fileId: 2,
      fileName: 'file1.pdf',
      fileType: 'pdf',
      date: new Date('2022-01-01'),
      filePath: '',
      fileSize: 3000,
    },
    {
      fileId: 3,
      fileName: 'file1.pdf',
      fileType: 'pdf',
      date: new Date('2022-01-01'),
      filePath: '',
      fileSize: 3000,
    },
    {
      fileId: 4,
      fileName: 'file1.pdf',
      fileType: 'pdf',
      date: new Date('2022-01-01'),
      filePath: '',
      fileSize: 3000,
    },
  ],
  registerDate: new Date('2022-01-01'),
  firstName: 'John',
  lastName: 'Doe',
  birthDate: new Date('2022-01-01'),
  age: 18,
  testResult: {
    height: 1.75,
    weight: 107,
    bloodPressure: 1,
    bloodType: 'A',
  },
};
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
