import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextButton from '@components/buttons/text_button';
import AddSelectedToQueueModal from '@containers/modals/add_selected_to_queue_modal';
import { useOverlay } from '@libs/overlay/useOverlay';
import './style/index.scss';
interface BookedAppointmentItemProps {
  patientFullName: string;
  BookedInDate: string;
  BookedByFullName: string;
}
export default function BookedAppointmentItem({
  patientFullName,
  BookedInDate,
  BookedByFullName,
}: BookedAppointmentItemProps) {
  const { open } = useOverlay();
  return (
    <div className="booked-appointment-item">
      <div>
        <span>Patient</span>
        <span>{patientFullName}</span>
      </div>
      <BorderSeparator direction="vertical" />
      <div className="booked-appointment-item-info">
        <span>Booked in</span>
        <span>{BookedInDate}</span>
      </div>
      <BorderSeparator direction="vertical" />
      <div className="booked-appointment-item-info">
        <span>Booked by</span>
        <span>{BookedByFullName}</span>
      </div>
      <BorderSeparator direction="vertical" />
      <TextButton
        text="Assign to queue"
        backgroundColor={color.cold_blue}
        fontColor={color.white}
        fontSize={12}
        padding="5px 10px"
        onPress={() => {
          open(
            <AddSelectedToQueueModal fullName={patientFullName} age={20} />,
            {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              width: '30%',
              closeBtn: 'inner',
            },
          );
        }}
      />
    </div>
  );
}
