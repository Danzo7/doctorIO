import colors from '@colors';
import TextButton from '@components/buttons/text_button';
import AppointmentsCurrentPatient from '@components/appointments_current_patient';
import './style/index.scss';
import ModalContainer from '@components/modal_container';
import useNavigation from '@libs/hooks/useNavigation';
import { ComponentProps, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startSession } from '@redux/instance/appointmentQueue/appointmentQueueSlice';
import {
  useNotifyQueueMutation,
  useStartNextMutation,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';

export default function NextPatient({
  patientName,
  arrivalTime,
  position,
}: ComponentProps<typeof AppointmentsCurrentPatient>) {
  const { navigate } = useNavigation();
  const [NotifyQueue] = useNotifyQueueMutation();
  const [StartNext] = useStartNextMutation();
  const [notified, setNotified] = useState(false);
  return (
    <ModalContainer
      title="Next patient"
      controls={
        <div className="next-patient-controls">
          <TextButton
            text="Notify"
            backgroundColor={colors.cold_blue}
            fontColor={colors.white}
            fontSize={13}
            fontWeight={700}
            onPress={() => {
              //REDUX change the roleId to the correct one
              NotifyQueue({ roleId: 1, position: position });
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
              StartNext(1);
              navigate('session');
            }}
          />
        </div>
      }
    >
      <AppointmentsCurrentPatient
        patientName={patientName}
        arrivalTime={arrivalTime}
        position={position}
      />
    </ModalContainer>
  );
}
