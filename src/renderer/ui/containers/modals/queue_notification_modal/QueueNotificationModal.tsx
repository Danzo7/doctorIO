import ModalContainer from '@components/modal_container';
import './style/index.scss';
import Attention from '@assets/audio/attention.mp3';
interface QueueNotificationModalProps {
  name: string;
  position: number;
}
export default function QueueNotificationModal({
  name,
  position,
}: QueueNotificationModalProps) {
  return (
    //UI make it look like good

    <ModalContainer title={'Queue notification'}>
      <div className="queue-notification-modal">
        Please notify the patient {name} with position {position} in the queue
        to meet the doctor.
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
