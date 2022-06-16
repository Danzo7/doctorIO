import AppointmentHistoryPanel from '@components/appointment_history_panel';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import MedicalHistory from '@components/medical_history';
import PreviewInfo from '@components/preview_info';
import './style/index.scss';

const historyList = [
  {
    appointmentDate: '28 Feb 2021',
    appointmentDescription: 'Sick from eating flesh',
    onPressHistory: () => {},
  },
  {
    appointmentDate: '21 Feb 2021',
    appointmentDescription: 'Sick from eating flesh',
    onPressHistory: () => {},
  },
  {
    appointmentDate: '29 Feb 2021',
    appointmentDescription: 'Sick from eating flesh',
    onPressHistory: () => {},
  },
  {
    appointmentDate: '22 Feb 2021',
    appointmentDescription: 'Sick from eating flesh',
    onPressHistory: () => {},
  },
  {
    appointmentDate: '22 Feb 2021',
    appointmentDescription: 'Sick from eating flesh',
    onPressHistory: () => {},
  },
  {
    appointmentDate: '22 Feb 2021',
    appointmentDescription: 'Sick from eating flesh',
    onPressHistory: () => {},
  },
  {
    appointmentDate: '22 Feb 2021',
    appointmentDescription: 'Sick from eating flesh',
    onPressHistory: () => {},
  },
];

const medicalHistoryList = [
  {
    medicalDescription: '22 Feb 2021',
    descriptionDate: 'Sick from eating flesh',
  },
  {
    medicalDescription: '22 Feb 2021',
    descriptionDate: 'Sick from eating flesh',
  },
];

const diagnosisData = {
  'Weight(kg)': '105',
  'height(cm)': '150',
  DPI: '1600',
};

interface MedicalSessionSideBarProps {}
export default function MedicalSessionSideBar({}: MedicalSessionSideBarProps) {
  return (
    <div className="medical-session-side-bar">
      <div className="medical-session-side-bar-content">
        <PreviewInfo
          title="Diagnosis"
          data={diagnosisData}
          buttonNode={
            <DarkLightCornerButton title="preview" onPress={() => {}} blend />
          }
        />
        <MedicalHistory
          medicalHistoryList={medicalHistoryList}
          onAdd={() => {}}
        />
        <AppointmentHistoryPanel
          historyList={historyList}
          onViewAll={() => {}}
        />
      </div>
    </div>
  );
}
