import colors, { color } from '@colors';
import TextButton from '@components/buttons/text_button';
import AppointmentsCurrentPatient from '@components/appointments_current_patient';
import './style/index.scss';
import ModalContainer from '@components/modal_container';
import useNavigation from '@libs/hooks/useNavigation';
import { useState } from 'react';

import {
  useGetNextQueueItemQuery,
  useNotifyQueueMutation,
  useProgressQueueStateMutation,
  useStartNextMutation,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import LoadingSpinner from '@components/loading_spinner';
import WarningModal from '../warning_modal';
import { Overlay } from '@libs/overlay';

interface NextPatientProps {
  invitedPatient?: { patientName: string; arrivalTime: Date; position: number };
}

export default function NextPatient({ invitedPatient }: NextPatientProps) {
  const { navigate } = useNavigation();
  const [NotifyQueue] = useNotifyQueueMutation();
  const [StartNext] = useStartNextMutation();
  const [notified, setNotified] = useState(false);
  const { data, isSuccess, isError, error, isFetching, isLoading } =
    useGetNextQueueItemQuery();
  const [ProgressQueueState] = useProgressQueueStateMutation();

  return isLoading && isFetching ? (
    <LoadingSpinner />
  ) : isSuccess ? (
    <ModalContainer
      title={invitedPatient?.position ? 'Invite patient' : 'Next patient'}
      controls={
        <div className="next-patient-controls">
          <TextButton
            text="Notify"
            backgroundColor={colors.cold_blue}
            fontColor={colors.white}
            fontSize={13}
            fontWeight={700}
            onPress={() => {
              NotifyQueue(
                invitedPatient ? invitedPatient.position : data.position,
              );
              setNotified(true);
            }}
          />
          <TextButton
            disabled={!notified}
            text="Start session"
            backgroundColor={colors.good_green}
            width="100%"
            fontColor={colors.white}
            fontSize={13}
            fontWeight={700}
            onPress={() => {
              if (invitedPatient) {
                ProgressQueueState(invitedPatient.position);
              } else {
                StartNext();
              }
              navigate('session');
            }}
          />
        </div>
      }
    >
      {
        <AppointmentsCurrentPatient
          patientName={
            invitedPatient ? invitedPatient.patientName : data.patientName
          }
          arrivalTime={invitedPatient ? invitedPatient.arrivalTime : data.date}
          position={invitedPatient ? invitedPatient.position : data.position}
        />
      }
    </ModalContainer>
  ) : (
    <WarningModal
      title="The queue is empty for now "
      description="You need to add patient to queue"
    >
      <TextButton
        text="Close"
        backgroundColor={color.cold_blue}
        width="100%"
        onPress={() => {
          Overlay.close();
        }}
      />
    </WarningModal>
  );
}
