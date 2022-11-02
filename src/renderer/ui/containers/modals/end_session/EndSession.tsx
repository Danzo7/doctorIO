import './style/index.scss';
import Print from 'toSvg/print.svg?icon';
import IconicButton from '@components/buttons/iconic_button';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import { useOverlay } from '@libs/overlay/useOverlay';
import useNavigation from '@libs/hooks/useNavigation';
import { useEndNextMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useAppDispatch, useAppSelector } from '@store';
import { useBookAppointmentMutation } from '@redux/instance/Appointment/AppointmentApi';
interface EndSessionProps {
  patientId: number;
}
export default function EndSession({ patientId }: EndSessionProps) {
  const { openTooltip } = useOverlay();
  const { navigate } = useNavigation();
  const [EndNext] = useEndNextMutation();
  const [bookAppointment] = useBookAppointmentMutation();
  const session = useAppSelector((state) => state.session);
  const currentSession = session.sessionInfo;
  const sessionParameters = session.sessionParameter;
  const dispatch = useAppDispatch();
  return (
    <ModalContainer
      title="End the session?"
      gap={10}
      controls={
        <div className="end-session-controls">
          <IconicButton
            Icon={Print}
            backgroundColor={color.cold_blue}
            radius={7}
            iconSize={14}
            width={30}
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
                  e.currentTarget,
                  true,
                );
            }}
          />
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
                  ({ id, ...other }) => other,
                ),
                payment:
                  sessionParameters.payment?.value &&
                  sessionParameters.payment?.handPayment &&
                  sessionParameters.payment?.value > 0
                    ? sessionParameters.payment.value
                    : undefined,
              }).then(() => {
                // if (
                //   sessionParameters.payment?.value &&
                //   sessionParameters.payment?.handPayment &&
                //   sessionParameters.payment?.value > 0
                // )
                //   dispatch(appointmentApi.util.invalidateTags(['payment']));
              });

              if (sessionParameters.bookAppointment)
                await bookAppointment({
                  body: {
                    date: sessionParameters.bookAppointment,
                    subject: 'follow up',
                  },
                  patientId: patientId,
                });
              navigate('queue');
            }}
          />
        </div>
      }
    ></ModalContainer>
  );
}
