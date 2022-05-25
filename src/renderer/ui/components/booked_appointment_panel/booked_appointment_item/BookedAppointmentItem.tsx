import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import './style/index.scss';
interface BookedAppointmentItemProps {
  patientFullName: string;
  BookedInDate: string;
  BookedByFullName: string;
  onAssign: () => void;
}
export default function BookedAppointmentItem({
  patientFullName,
  BookedInDate,
  BookedByFullName,
  onAssign,
}: BookedAppointmentItemProps) {
  return (
    <div className="booked-appointment-item">
      <div>
        <span>Patient</span>
        <span>{patientFullName}</span>
      </div>
      <div className="booked-appointment-item-sep" />
      <div className="booked-appointment-item-info">
        <span>Booked in</span>
        <span>{BookedInDate}</span>
      </div>
      <div className="booked-appointment-item-sep" />
      <div className="booked-appointment-item-info">
        <span>Booked by</span>
        <span>{BookedByFullName}</span>
      </div>
      <div className="booked-appointment-item-sep" />
      <TextButton
        text="Assign to queue"
        backgroundColor={color.cold_blue}
        fontColor={color.white}
        fontSize={12}
        padding="5px 10px"
        onPress={onAssign}
      />
    </div>
  );
}
