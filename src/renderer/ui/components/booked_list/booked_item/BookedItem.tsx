import './style/index.scss';
import Panding from 'toSvg/pending.svg';
import InQueue from 'toSvg/in_queue.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import { useOverlay } from '@libs/overlay/useOverlay';
import AddSelectedToQueueModal from '@containers/modals/add_selected_to_queue_modal';
import { formatDistance } from 'date-fns';
import { BookedAppointment } from '@models/instance.model';
import { DEFAULT_MODAL } from '@libs/overlay';
import useNavigation from '@libs/hooks/useNavigation';
import TextPair from '@components/text_pair/TextPair';
import { color } from '@assets/styles/color';

function BookedItem({
  patientName,
  bookDate,
  state,
  patientId,
}: BookedAppointment) {
  const { openTooltip, open } = useOverlay();
  const { navigate } = useNavigation();
  return (
    <div className="booked-item">
      <div className="left-container">
        <TextPair
          maxWidth={120}
          first={{
            text: patientName,
            fontSize: 15,
            fontWeight: '600',
            fontColor: color.white,
          }}
          second={{
            text: formatDistance(bookDate, new Date()) + ' ago',
            fontSize: 12,
            fontWeight: '400',
            fontColor: color.text_gray,
          }}
        />

        {state == 'panding' && (
          <div className="state-container">
            <Panding></Panding>
            <span>Panding</span>
          </div>
        )}
        {state == 'in queue' && (
          <div className="state-container">
            <InQueue></InQueue>
            <span>In queue</span>
          </div>
        )}
      </div>
      <SquareIconButton
        Icon={threeDots}
        onPress={(e) => {
          if (e)
            openTooltip(
              [
                state == 'panding' && {
                  text: 'Add to queue',
                  onPress: () => {
                    open(
                      <AddSelectedToQueueModal
                        firstName={patientName.split(' ')[0]}
                        lastName={patientName.split(' ')[1]}
                        patId={patientId}
                      />,
                      DEFAULT_MODAL,
                    );
                  },
                },
                {
                  text: 'View records',
                  onPress: () => {
                    navigate('/records/' + patientId, { replace: true });
                  },
                },
                {
                  text: 'Remove',
                  type: 'warning',
                },
              ].filter(Boolean) as any,
              e?.currentTarget,
              true,
            );
        }}
      />
    </div>
  );
}

export default BookedItem;
