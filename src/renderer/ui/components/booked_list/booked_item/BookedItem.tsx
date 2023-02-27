import './style/index.scss';
import Panding from 'toSvg/pending.svg';
import InQueue from 'toSvg/in_queue.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import AddSelectedToQueueModal from '@containers/modals/add_selected_to_queue_modal';
import { formatDistance } from 'date-fns';
import { BookedAppointment } from '@models/instance.model';
import { DEFAULT_MODAL, modal, tooltip } from '@libs/overlay';
import useNavigation from '@libs/hooks/useNavigation';
import TextPair from '@components/text_pair/TextPair';
import { color } from '@assets/styles/color';
import { useCancelAppointmentMutation } from '@redux/instance/Appointment/AppointmentApi';
import { useDeleteAppointmentMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useAbility } from '@stores/abilityStore';
import { useSelectedQueue } from '@stores/queueSelectionStore';

function BookedItem({
  patientName,
  id,
  bookedFor,
  state,
  patientId,
}: BookedAppointment) {
  const selectedQueue = useSelectedQueue();

  const { navigate } = useNavigation();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [CancelAppointment] = useCancelAppointmentMutation();
  const abilities = useAbility();
  return (
    <div className="booked-item">
      <div className="left-container">
        <TextPair
          first={{
            text: patientName,
            fontSize: 14,
            fontWeight: '600',
            fontColor: color.white,
          }}
          second={{
            text: formatDistance(bookedFor, new Date()) + ' ago',
            fontSize: 10,
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
        tip="More"
        onPress={(e) => {
          if (e)
            tooltip(
              () =>
                [
                  state == 'PANDING' && {
                    text: 'Add to queue',
                    onPress: () => {
                      modal(
                        <AddSelectedToQueueModal
                          id={patientId}
                          name={patientName}
                          appointmentId={id}
                        />,
                        DEFAULT_MODAL,
                      ).open();
                    },
                  },
                  abilities.can('view', 'records') && {
                    text: 'View records',
                    onPress: () => {
                      navigate('/records/' + patientId, { replace: true });
                    },
                  },
                  {
                    text: state == 'IN_QUEUE' ? 'Remove' : 'Cancel',
                    onPress: () => {
                      if (state == 'IN_QUEUE') {
                        deleteAppointment({
                          selectedQueue,

                          appointmentId: id,
                        });
                      } else {
                        CancelAppointment(id);
                      }
                    },
                    type: 'warning',
                  },
                ].filter(Boolean) as any,
              e.currentTarget,
              { autoClose: true },
            ).open();
        }}
      />
    </div>
  );
}

export default BookedItem;
