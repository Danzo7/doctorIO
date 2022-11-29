import './style/index.scss';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import useNavigation from '@libs/hooks/useNavigation';
import { useEndNextMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useBookAppointmentMutation } from '@redux/instance/Appointment/AppointmentApi';
import { useMedicalSessionStore } from '@stores/medicalSessionStore';
import AlertModal from '../dialog_modal';
import { useQueueSelectionStore } from '@stores/queueSelectionStore';
interface EndSessionProps {
  patientId: number;
}
export default function EndSession({ patientId }: EndSessionProps) {
  const selectedQueue = useQueueSelectionStore.getState().selectedQueue;
  const { navigate } = useNavigation();
  const [EndNext] = useEndNextMutation();
  const [bookAppointment] = useBookAppointmentMutation();
  const currentSession = useMedicalSessionStore.getState().session;
  const sessionParameters = useMedicalSessionStore.getState().sessionParameter;
  return (
    <AlertModal
      title="End the session?"
      description="Are you sure you want to finish the session ?"
      status="warning"
      controls={
        <TextButton
          text="Confirm"
          fontSize={14}
          fontColor={color.white}
          fontWeight={700}
          backgroundColor={color.good_green}
          padding=" 5px 15px"
          onPress={async () => {
            await EndNext({
              selectedQueue,
              body: {
                diagnosis:
                  currentSession.diagnosis?.length > 0
                    ? currentSession.diagnosis
                    : undefined,
                prescription:
                  currentSession.prescription?.length > 0
                    ? currentSession.prescription.map(
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        ({ id, ...other }) => other,
                      )
                    : undefined,
                payment:
                  sessionParameters.payment?.value &&
                  sessionParameters.payment?.isHandPayment &&
                  sessionParameters.payment?.value > 0
                    ? sessionParameters.payment.value
                    : undefined,
              },
            });

            if (sessionParameters.booked)
              await bookAppointment({
                selectedQueue: selectedQueue,
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
      }
    ></AlertModal>
  );
}
