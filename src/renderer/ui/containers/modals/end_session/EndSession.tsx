import './style/index.scss';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { useOverlay } from '@libs/overlay/useOverlay';
import useNavigation from '@libs/hooks/useNavigation';
import { useEndNextMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useBookAppointmentMutation } from '@redux/instance/Appointment/AppointmentApi';
import { useMedicalSessionStore } from '@stores/medicalSessionStore';
import WarningModal from '../warning_modal';
interface EndSessionProps {
  patientId: number;
}
export default function EndSession({ patientId }: EndSessionProps) {
  const { openTooltip } = useOverlay();
  const { navigate } = useNavigation();
  const [EndNext] = useEndNextMutation();
  const [bookAppointment] = useBookAppointmentMutation();
  const currentSession = useMedicalSessionStore.getState().session;
  const sessionParameters = useMedicalSessionStore.getState().sessionParameter;
  return (
    <WarningModal
      title="End the session?"
      description="Are you sure you want to finish the session ?"
    >
      <div className="end-session-controls">
        <TextButton
          text="Confirm"
          fontSize={14}
          fontColor={color.white}
          fontWeight={700}
          backgroundColor={color.good_green}
          padding=" 5px 15px"
          width={'100%'}
          onPress={async () => {
            await EndNext({
              diagnosis: currentSession.diagnosis,
              prescription: currentSession.prescription.map(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ({ id, ...other }) => other,
              ),
              payment:
                sessionParameters.payment?.value &&
                sessionParameters.payment?.isHandPayment &&
                sessionParameters.payment?.value > 0
                  ? sessionParameters.payment.value
                  : undefined,
            });

            if (sessionParameters.booked)
              await bookAppointment({
                body: {
                  date: sessionParameters.booked,
                  subject: 'follow up',
                },
                patientId: patientId,
              });
            useMedicalSessionStore.getState().clear();
            navigate('queue');
          }}
        />
      </div>
    </WarningModal>
  );
}
