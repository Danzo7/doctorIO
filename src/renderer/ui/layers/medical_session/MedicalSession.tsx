import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import TextButton from '@components/buttons/text_button';
import RandomSvgFaces from 'toSvg/randomSvgFaces.svg?icon';
import Header from '@components/header';
import LoadingSpinner from '@components/loading_spinner';
import PrintedLayout from '@components/printed_layout';
import VerticalPanel from '@components/vertical_panel';
import EndSession from '@containers/modals/end_session';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import { useGetQueueStateQuery } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useGetPatientDetailQuery } from '@redux/instance/record/patient_api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMedicalSessionStore } from '@stores/medicalSessionStore';
import { useNavigate } from 'react-router-dom';
import PatientSmallCard from './components/patient_small_card';
import MedicalSessionSideBar from './medical_session_side_bar';
import DiagnosisTab from './pages/diagnosis_tab';
import PrescriptionTab from './pages/prescription_tab';
import SessionParameter from './pages/session_parameter';
import './style/index.scss';
import { useRef } from 'react';
import TabComponent from '@components/tab_component';
import { useSelectedQueue } from '@stores/queueSelectionStore';

interface MedicalSessionProps {}

export default function MedicalSession({}: MedicalSessionProps) {
  const selectedQueue = useSelectedQueue();
  const queueStateQuery = useGetQueueStateQuery(selectedQueue);

  const myMemberDetailQuery = useGetMyMemberDetailQuery(undefined, {
    skip: !queueStateQuery.isSuccess,
  });
  const navigate = useNavigate();
  const patientId =
    queueStateQuery.isSuccess &&
    queueStateQuery.data.selected?.patientId != undefined &&
    queueStateQuery.data.state == 'IN_PROGRESS'
      ? queueStateQuery.data.selected.patientId
      : undefined;
  const { isLoading, data, isSuccess, isUninitialized } =
    useGetPatientDetailQuery(patientId ?? skipToken);
  const { open, openTooltip } = useOverlay();

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
  const render = useRef(queueStateQuery.isSuccess);

  const renderSpinner =
    render.current ||
    queueStateQuery.isFetching ||
    (!isUninitialized && isLoading);

  render.current = false;

  return renderSpinner ? (
    <LoadingSpinner />
  ) : isSuccess && patientId != undefined ? (
    <div className="medical-session">
      {
        <>
          <MedicalSessionSideBar
            biometricScreening={queueStateQuery.data?.selected?.test}
            patientId={patientId}
          />

          <div className="content-container">
            <Header
              title={{ text: 'Session', fontSize: 20, fontWeight: 600 }}
              buttonNode={
                <PatientSmallCard
                  age={data.age}
                  firstName={data.firstName}
                  lastName={data.lastName}
                  patId={patientId}
                />
              }
            />
            {/* <TabMenu items={['prescription', 'notice']}>
              <PrescriptionTab />
              <DiagnosisTab />
            </TabMenu> */}
            <TabComponent
              foldedItems={[
                { label: 'Preview', content: <div>Radio</div> },
                { label: 'Bilans', content: <div>Bilans</div> },
                { label: 'Preview', content: <div>Preview</div> },
              ]}
              items={[
                { label: 'Prescription', content: <PrescriptionTab /> },
                { label: 'Notice', content: <DiagnosisTab /> },
              ]}
            />
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
                                  data.firstName + ' ' + data.lastName
                                }
                                patientAge={data.age}
                                drugList={
                                  useMedicalSessionStore.getState().session
                                    .prescription
                                }
                                doctorName={
                                  myMemberDetailQuery.data?.name ?? 'John doe'
                                }
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
        </>
      }
    </div>
  ) : (
    <div className="no-queue-item" css={{ alignSelf: 'center' }}>
      <VerticalPanel
        title="No appointment is selected"
        description="You need to select an appointment from the queue. "
        Icon={<RandomSvgFaces width={100} height={100} />}
        action={{
          text: 'Back home',
          onClick: () => {
            navigate('/');
          },
        }}
      />
    </div>
  );
}
