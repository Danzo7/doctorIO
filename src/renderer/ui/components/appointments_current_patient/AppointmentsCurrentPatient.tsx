import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import { formatDistance, subDays } from 'date-fns';
import './style/index.scss';
interface AppointmentsCurrentPatientProps {
  patientName: string;
  arrivalTime?: Date;
  position: number;
}
export default function AppointmentsCurrentPatient({
  patientName,
  arrivalTime = subDays(new Date(), 3),
  position,
}: AppointmentsCurrentPatientProps) {
  return (
    <div className="appointments-current-patient">
      <TextPair
        first={{
          text: patientName,
          fontColor: color.white,
          fontWeight: '400',
          fontSize: 17,
        }}
        second={{
          text: formatDistance(arrivalTime, new Date()),
          fontColor: color.text_gray,
          fontSize: 10,
          fontWeight: '400',
        }}
      />
      <BorderSeparator direction="vertical" />
      <TextPair
        alignItems="center"
        first={{
          text: 'Number',
          fontColor: color.white,
          fontWeight: '400',
          fontSize: 12,
        }}
        second={{
          text: position,
          fontColor: color.white,
          fontSize: 21,
          fontWeight: '400',
        }}
      />
    </div>
  );
}
