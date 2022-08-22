import './style/index.scss';
import Print from 'toSvg/print.svg?icon';
import IconicButton from '@components/buttons/iconic_button';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import { useOverlay } from '@libs/overlay/useOverlay';
import useNavigation from '@libs/hooks/useNavigation';
import { useEndNextMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useAppSelector } from '@store';
interface EndSessionProps {}
export default function EndSession({}: EndSessionProps) {
  const { openTooltip } = useOverlay();
  const { navigate } = useNavigation();
  const [EndNext] = useEndNextMutation();
  const session = useAppSelector((state) => state.session);
  const currentSession = session.sessionInfo;
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
                  e?.currentTarget,
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
            onPress={() => {
              EndNext({
                roleId: 1,
                body: {
                  diagnosis: currentSession.diagnosis,
                  prescription: currentSession.prescription.map(
                    ({ id, ...other }) => other,
                  ),
                },
              })
                .then(() => navigate('queue'))

                .catch((error) => console.log(error));
            }}
          />
        </div>
      }
    ></ModalContainer>
  );
}
