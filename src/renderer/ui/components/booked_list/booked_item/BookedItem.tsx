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
import {
  useAssignAppointmentToQueueMutation,
  useCancelAppointmentMutation,
} from '@redux/instance/Appointment/AppointmentApi';
import { useDeleteAppointmentMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useAbility } from '@stores/abilityStore';

function BookedItem({
  patientName,
  id,
  bookedBy,
  bookedFor,
  state,
  patientId,
}: BookedAppointment) {
  const { openTooltip, open, close } = useOverlay();
  const { navigate } = useNavigation();
  const [AssignAppointmentToQueue] = useAssignAppointmentToQueueMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [CancelAppointment] = useCancelAppointmentMutation();
  const abilities = useAbility();
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
            text: formatDistance(bookedFor, new Date()) + ' ago',
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
                        appointmentId={id}
                        onAdd={() => {
                          AssignAppointmentToQueue({ appointmentId: id });
                        }}
                      />,
                      DEFAULT_MODAL,
                    );
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
                        roleId: 1,
                        appointmentId: id,
                      });
                    } else {
                      CancelAppointment(id);
                    }
                    close();
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
