import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextButton from '@components/buttons/text_button';
import NotAButton from '@components/not_a_button';
import TextPair from '@components/text_pair/TextPair';
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
      <TextPair second="Patient" first={patientName} reversed />

      <BorderSeparator direction="vertical" />
      <TextPair
        second="Booked in"
        first={format(bookDate, DATE_ONLY)}
        reversed
      />
      <BorderSeparator direction="vertical" />
      <TextPair second="Booked by" first={bookedBy.memberName} reversed />
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
        <NotAButton text={'In queue'} color={color.warm_orange} />
      )}
    </div>
  );
}
