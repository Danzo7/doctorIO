import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextButton from '@components/buttons/text_button';
import Done from 'toSvg/done.svg?icon';
import Header from '@components/header';
import LoadingSpinner from '@components/loading_spinner';
import VerticalPanel from '@components/vertical_panel';
import EndSession from '@containers/modals/end_session';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import { useGetQueueStateQuery } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useGetPatientDetailQuery } from '@redux/instance/record/patient_api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router-dom';
import PatientSmallCard from './components/patient_small_card';
import MedicalSessionSideBar from './medical_session_side_bar';
import PrescriptionTab from './pages/prescription_tab';
import SessionParameter from './pages/session_parameter';
import './style/index.scss';
import { useRef } from 'react';
import TabComponent from '@components/tab_component';
import { useSelectedQueue } from '@stores/queueSelectionStore';
import { modal } from '@libs/overlay';
import CertificatesTab from './pages/cetificates_tab';

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
  const {
    isLoading,
    data: patient,
    isSuccess,
    isUninitialized,
  } = useGetPatientDetailQuery(patientId ?? skipToken);

  const openEndSessionModal = () => {
    const appId = queueStateQuery.data?.selected?.appointmentId;
    const mem = myMemberDetailQuery.data;
    if (patient && mem && patientId && appId)
      modal(
        () => (
          <EndSession
            patientId={patientId}
            patient={patient}
            member={mem}
            appointmentId={appId}
          />
        ),
        {
          closeOnClickOutside: true,
          isDimmed: true,
          clickThrough: false,
          position: { top: '30%' },
          width: '30%',
          closeBtn: 'inner',
        },
      ).open();
    else throw new Error('patientId is undefined');
  };
  const render = useRef(false);

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
                  age={patient.age}
                  firstName={patient.firstName}
                  lastName={patient.lastName}
                  patId={patientId}
                />
              }
            />
            <TabComponent
              showVerticalPanel
              flexGrow={0}
              foldedItems={[
                { label: 'Prescription', content: <PrescriptionTab /> },

                {
                  label: 'Certificates',
                  content: <CertificatesTab />,
                },
              ]}
              items={[]}
            />
            <BorderSeparator direction="horizontal" />
            <SessionParameter />
            <div className="controls-div">
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
        title="Everything is done"
        description="No appointment is in progress at the moment. "
        Icon={<Done width={100} height={100} />}
        action={{
          text: 'Back home',
          onClick: () => {
            navigate('/');
          },
        }}
        backgroundColor={color.secondary_color}
      />
    </div>
  );
}
