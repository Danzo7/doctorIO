import ModalContainer from '@components/modal_container';
import './style/index.scss';
import Attention from '@assets/audio/attention.mp3';
import NotAButton from '@components/not_a_button';
import { color } from '@assets/styles/color';
import NumberIcon from '@components/number_icon';
interface QueueNotificationModalProps {
  name: string;
  position: number;
}
export default function QueueNotificationModal({
  name,
  position,
}: QueueNotificationModalProps) {
  return (
    <ModalContainer gap={0}>
      <div className="queue-notification-modal">
        <span>Attention</span>
        <NotAButton borderColor={color.good_green}>
          <div className="queue-not-aButton">
            <NumberIcon value={position} />
            <span>{name}</span>
          </div>
        </NotAButton>
        <span className="last-span">
          Please notify the patient to meet the doctor
        </span>
        <audio
          src={Attention}
          ref={(e) => {
            if (e) {
              if (e.currentTime > 0.9) e.currentTime = 0;
              e.play();
            }
          }}
        />
      </div>
    </ModalContainer>
  );
}
