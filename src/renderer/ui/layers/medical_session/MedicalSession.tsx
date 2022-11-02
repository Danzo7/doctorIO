import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import LoadingSpinner from '@components/loading_spinner';
import PrintedLayout from '@components/printed_layout';
import TabMenu from '@components/tab_menu';
import EndSession from '@containers/modals/end_session';
import WarningModal from '@containers/modals/warning_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { ModalPortal } from '@libs/overlay/OverlayContainer';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Patient } from '@models/instance.model';
import { useGetClinicQuery } from '@redux/clinic/clinicApi';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import { useGetQueueStateQuery } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useGetPatientDetailQuery } from '@redux/instance/record/patient_api';
import { resetSession } from '@redux/local/session/sessionSlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAppDispatch, useAppSelector } from '@store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientSmallCard from './components/patient_small_card';
import MedicalSessionSideBar from './medical_session_side_bar';
import DiagnosisTab from './pages/diagnosis_tab';
import PrescriptionTab from './pages/prescription_tab';
import SessionParameter from './pages/session_parameter';
import './style/index.scss';

interface MedicalSessionProps {}

export default function MedicalSession({}: MedicalSessionProps) {
  const {
    data: state,
    isError: isErrorState,
    isLoading: isLoadingState,
    isSuccess: isSuccessState,
    isFetching: isFetchingState,
    error: errorState,
  } = useGetQueueStateQuery();
  const GetClinicQuery = useGetClinicQuery();
  const GetMyMemberDetail = useGetMyMemberDetailQuery();
  const navigate = useNavigate();
  const queueState = state;
  const patientId =
    queueState &&
    queueState.selected?.patientId &&
    queueState.state == 'IN_PROGRESS'
      ? queueState.selected.patientId
      : undefined;
  const { isLoading, data, isSuccess, isError, error, isFetching } =
    useGetPatientDetailQuery(patientId ?? skipToken);
  const { open, openTooltip } = useOverlay();
  const session = useAppSelector((appState) => appState.session);
  const currentSession = session.sessionInfo;
  const openEndSessionModal = () => {
    if (patientId)
      open(<EndSession patientId={patientId} />, {
        closeOnClickOutside: true,
        isDimmed: true,
        clickThrough: false,
        position: { top: '30%' },
        width: '30%',
        closeBtn: 'inner',
      });
    else throw new Error('patientId is undefined');
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetSession());
  }, [dispatch]);

  return isLoading ||
    isFetching ||
    isFetchingState ||
    isLoadingState ||
    GetClinicQuery.isLoading ||
    GetMyMemberDetail.isLoading ? (
    <LoadingSpinner />
  ) : isSuccess &&
    GetClinicQuery.isSuccess &&
    GetMyMemberDetail.isSuccess &&
    patientId ? (
    (() => {
      const patient = data as Patient;
      return (
        <div className="medical-session">
          <MedicalSessionSideBar patientId={patientId} />
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
                  patId={patientId}
                />
              }
            />
            <TabMenu items={['prescription', 'notice']}>
              <PrescriptionTab />
              <DiagnosisTab />
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
                          onPress: () => {
                            open(
                              <PrintedLayout
                                patientName={
                                  patient.firstName + ' ' + patient.lastName
                                }
                                patientAge={patient.age}
                                drugList={currentSession.prescription}
                                clinicName={GetClinicQuery.data.name}
                                ClinicAddress={GetClinicQuery.data.address}
                                doctorName={GetMyMemberDetail.data.name}
                              />,
                              {
                                closeOnClickOutside: true,
                                closeOnBlur: true,
                                isDimmed: true,
                                clickThrough: false,
                              },
                            );
                          },
                        },
                        {
                          text: 'Both',
                        },
                      ],
                      e.currentTarget,
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
    <ModalPortal onClose={() => navigate('/')} {...DEFAULT_MODAL}>
      <WarningModal
        title="Error"
        description={
          queueState?.state !== 'IN_PROGRESS'
            ? 'No queue item is selected'
            : 'Something went wrong'
        }
      />
    </ModalPortal>
  );
}
