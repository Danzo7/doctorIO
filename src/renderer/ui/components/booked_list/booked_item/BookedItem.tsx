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

function BookedItem({
  patientName,
  bookTime,
  state,
  patientId,
}: BookedAppointment) {
  const { openTooltip, open } = useOverlay();
  return (
    <div className="booked-item">
      <div className="right-container">
        <div className="info-container">
          <span className="name">{patientName}</span>
          <span className="info">
            {formatDistance(bookTime, new Date())} ago
          </span>
        </div>
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
        svg={threeDots}
        onPress={(e) => {
          if (e)
            openTooltip(
              [
                state == 'panding' && {
                  text: 'Add to queue',
                  onPress: () => {
                    open(
                      <AddSelectedToQueueModal
                        fullName={patientName}
                        id={patientId}
                      />,
                      DEFAULT_MODAL,
                    );
                  },
                },
                {
                  text: 'View records',
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
