import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextButton from '@components/buttons/text_button';
import { DATE_ONLY } from '@constants/data_format';
import AddSelectedToQueueModal from '@containers/modals/add_selected_to_queue_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { BookedAppointment } from '@models/instance.model';
import { format } from 'date-fns';
import './style/index.scss';

export default function BookedAppointmentItem({
  patientName,
  bookDate,
  bookedBy,
  patientId,
  state,
}: BookedAppointment) {
  const { open } = useOverlay();
  return (
    <div className="booked-appointment-item">
      <div>
        <span>Patient</span>
        <span>{patientName}</span>
      </div>
      <BorderSeparator direction="vertical" />
      <div className="booked-appointment-item-info">
        <span>Booked in</span>
        <span>{format(bookDate, DATE_ONLY)}</span>
      </div>
      <BorderSeparator direction="vertical" />
      <div className="booked-appointment-item-info">
        <span>Booked by</span>
        <span>{bookedBy.memberName}</span>
      </div>
      <BorderSeparator direction="vertical" />
      {state == 'panding' ? (
        <TextButton
          text="Assign to queue"
          backgroundColor={color.cold_blue}
          fontColor={color.white}
          fontSize={12}
          padding="5px 10px"
          onPress={() => {
            open(
              <AddSelectedToQueueModal
                firstName={patientName.split(' ')[0]}
                lastName={patientName.split(' ')[1]}
                patId={patientId}
              />,
              DEFAULT_MODAL,
            );
          }}
        />
      ) : (
        <span>{state}</span>
      )}
    </div>
  );
}
