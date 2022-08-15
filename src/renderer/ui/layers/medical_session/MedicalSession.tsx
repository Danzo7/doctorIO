import color from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import LoadingSpinner from '@components/loading_spinner';
import TabMenu from '@components/tab_menu';
import EndSession from '@containers/modals/end_session';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Patient } from '@models/instance.model';
import { useGetPatientDetailQuery } from '@redux/instance/record/recordApi';
import PatientSmallCard from './components/patient_small_card';
import MedicalSessionSideBar from './medical_session_side_bar';
import NoticeTab from './pages/notice_tab';
import PrescriptionTab from './pages/prescription_tab';
import SessionParameter from './pages/session_parameter';
import './style/index.scss';
interface MedicalSessionProps {
  patId: number;
}

export default function MedicalSession({ patId }: MedicalSessionProps) {
  const { isLoading, data, isSuccess } = useGetPatientDetailQuery(patId);
  const patient = isSuccess ? data : undefined;
  const { open, openTooltip } = useOverlay();
  const openEndSessionModal = () => {
    open(<EndSession />, {
      closeOnClickOutside: true,
      isDimmed: true,
      clickThrough: false,
      position: { top: '30%' },
      width: '30%',
      closeBtn: 'inner',
    });
  };
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    patient && isSuccess && (
      <div className="medical-session">
        <MedicalSessionSideBar patient={patient} />
        <div className="content-container">
          <Header
            title="Session"
            titleFontSize={20}
            titleFontWeight={600}
            buttonNode={
              <PatientSmallCard
                age={patient.age}
                firstName={patient.firstName}
                lastName={patient.lastName}
                patId={patId}
              />
            }
          />
          <TabMenu items={['prescription', 'notice']}>
            <PrescriptionTab />
            <NoticeTab />
          </TabMenu>
          <BorderSeparator direction="horizontal" />
          <SessionParameter />
          <div className="controls-div">
            <DarkLightCornerButton
              text="Print..."
              onPress={(e) => {
                if (e)
                  openTooltip(
                    [
                      {
                        text: 'Notice',
                      },
                      {
                        text: 'Prescription',
                      },
                      {
                        text: 'Both',
                      },
                    ],
                    e?.currentTarget,
                    true,
                  );
              }}
            />
            <TextButton
              text="Finish"
              backgroundColor={color.good_green}
              width={170}
              onPress={openEndSessionModal}
            />
          </div>
        </div>
      </div>
    )
  );
}
