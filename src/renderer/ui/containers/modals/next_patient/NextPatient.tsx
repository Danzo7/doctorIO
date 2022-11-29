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
import AlertModal from '../dialog_modal';
import { useQueueSelectionStore } from '@stores/queueSelectionStore';
import { Overlay_u } from '@stores/overlayStore';

interface NextPatientProps {
  invitedPatient?: { patientName: string; arrivalTime: Date; position: number };
}

export default function NextPatient({ invitedPatient }: NextPatientProps) {
  const selectedQueue = useQueueSelectionStore.getState().selectedQueue;
  const { navigate } = useNavigation();
  const [NotifyQueue] = useNotifyQueueMutation();
  const [StartNext] = useStartNextMutation();
  const [notified, setNotified] = useState(false);
  const { data, isSuccess, isFetching, isLoading } =
    useGetNextQueueItemQuery(selectedQueue);
  const [ProgressQueueState] = useProgressQueueStateMutation();

  return isLoading && isFetching ? (
    <ModalContainer isLoading={isLoading} />
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
              NotifyQueue({
                selectedQueue: selectedQueue,
                position: invitedPatient
                  ? invitedPatient.position
                  : data.position,
              });
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
                ProgressQueueState({
                  selectedQueue: selectedQueue,
                  position: invitedPatient.position,
                });
              } else {
                StartNext(selectedQueue);
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
    <AlertModal
      title="The queue is empty for now "
      description="You need to add patient to queue"
      status="warning"
      controls={
        <TextButton
          text="Close"
          backgroundColor={color.cold_blue}
          onPress={() => {
            Overlay_u.close();
          }}
        />
      }
    ></AlertModal>
  );
}
