import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import LoadingSpinner from '@components/loading_spinner';
import TabMenu from '@components/tab_menu';
import EndSession from '@containers/modals/end_session';
import WarningModal from '@containers/modals/warning_modal';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Patient } from '@models/instance.model';
import { useGetQueueStateQuery } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useGetPatientDetailQuery } from '@redux/instance/record/patient_api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import PatientSmallCard from './components/patient_small_card';
import MedicalSessionSideBar from './medical_session_side_bar';
import NoticeTab from './pages/notice_tab';
import PrescriptionTab from './pages/prescription_tab';
import SessionParameter from './pages/session_parameter';
import './style/index.scss';

interface MedicalSessionProps {}

export default function MedicalSession({}: MedicalSessionProps) {
  const stateQuery = useGetQueueStateQuery(1);
  const patId =
    stateQuery.isSuccess &&
    stateQuery.data.selected &&
    stateQuery.data.state == 'IN_PROGRESS'
      ? stateQuery.data.selected.patientId
      : undefined;
  const { isLoading, data, isSuccess, isError, error, isFetching } =
    useGetPatientDetailQuery(patId ? patId : skipToken);
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
  return isLoading ||
    isFetching ||
    stateQuery.isFetching ||
    stateQuery.isLoading ? (
    <LoadingSpinner />
  ) : isSuccess && patId ? (
    (() => {
      const patient = data as Patient;
      return (
        <div className="medical-session">
          <MedicalSessionSideBar patientId={patId} />
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
      );
    })()
  ) : (
    <WarningModal
      warningTitle="Error"
      warningDescription={'Something went wrong'}
    />
  );
}
