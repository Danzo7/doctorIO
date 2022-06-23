import AppointmentHistoryPanel from '@components/appointment_history_panel';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import MedicalHistory from '@components/medical_history';
import PreviewInfo from '@components/preview_info';
import DiagnosisPreview from '@containers/modals/diagnosis_preview';
import { useOverlay } from '@libs/overlay/useOverlay';
import './style/index.scss';

const historyList = [
  {
    date: new Date('2022-05-01'),
    description: 'Sickness for the day',
    id: '1',
  },
  {
    date: new Date('2022-05-02'),
    description: 'dead inside',
    id: '2',
  },
  {
    date: new Date('2022-05-03'),
    description: 'good health',
    id: '3',
  },
  {
    date: new Date('2022-05-04'),
    description: 'good health',
    id: '4',
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
  const { open } = useOverlay();
  return (
    <div className="medical-session-side-bar">
      <div className="medical-session-side-bar-content">
        <PreviewInfo
          title="Diagnosis"
          data={diagnosisData}
          buttonNode={
            <DarkLightCornerButton
              title="preview"
              blend
              onPress={() => {
                open(
                  <DiagnosisPreview
                    data={[
                      { firstText: 'something', secondText: '11' },
                      { firstText: 'something', secondText: '11' },
                      { firstText: 'something', secondText: '11' },
                      { firstText: 'something', secondText: '11' },
                      { firstText: 'something', secondText: '11' },
                      { firstText: 'something', secondText: '11' },
                    ]}
                  />,
                  {
                    closeOnClickOutside: true,
                    isDimmed: true,
                    clickThrough: false,
                    closeBtn: 'inner',
                    width: '30%',
                  },
                );
              }}
            />
          }
        />
        <MedicalHistory medicalHistoryList={medicalHistoryList} />
        <AppointmentHistoryPanel list={historyList} />
      </div>
    </div>
  );
}
