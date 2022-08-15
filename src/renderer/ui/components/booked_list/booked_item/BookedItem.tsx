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
import { useDispatch } from 'react-redux';
import { removeBookedAppointment } from '@redux/instance/bookedAppointmentSlice';

function BookedItem({
  patientName,
  bookDate,
  state,
  patientId,
}: BookedAppointment) {
  const { openTooltip, open } = useOverlay();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  return (
    <div className="booked-item">
      <div className="left-container">
        <TextPair
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

        {state == 'PANDING' && (
          <div className="state-container">
            <Panding></Panding>
            <span>Panding</span>
          </div>
        )}
        {state == 'IN_QUEUE' && (
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
                state == 'PANDING' && {
                  text: 'Add to queue',
                  onPress: () => {
                    open(
                      <AddSelectedToQueueModal
                        id={patientId}
                        name={patientName}
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
                  onPress: () => {
                    dispatch(
                      removeBookedAppointment({
                        bookDate: bookDate,
                        patientId: patientId,
                      }),
                    );
                  },
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
