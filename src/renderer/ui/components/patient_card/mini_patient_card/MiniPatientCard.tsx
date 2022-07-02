import color from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import { DATE_ONLY } from '@constants/data_format';
import { format } from 'date-fns';
import './style/index.scss';
interface MiniPatientCardProps {
  patientFullName: string;
  patientId: string;
  numPostAppointment: number;
  nextAppointmentDate?: Date;
}
export default function MiniPatientCard({
  patientFullName,
  patientId,
  numPostAppointment,
  nextAppointmentDate,
}: MiniPatientCardProps) {
  return (
    <div className="mini-patient-card">
      <TextPair
        alignItems="center"
        first={{
          text: patientFullName,
          fontSize: 15,
          fontColor: color.white,
          fontWeight: '600',
        }}
        second={{
          text: patientId,
          fontSize: 12,
          fontColor: color.text_gray,
          fontWeight: '600',
        }}
      />
      <div className="mini-patient-bottom-container">
        <TextPair
          alignItems="center"
          first={{
            text: numPostAppointment.toString(),
            fontSize: 15,
            fontColor: color.white,
            fontWeight: '700',
          }}
          second={{
            text: 'Post Appointment',
            fontSize: 13,
            fontColor: color.text_gray,
            fontWeight: '600',
          }}
        />
        <BorderSeparator direction="vertical" />
        <TextPair
          alignItems="center"
          first={{
            text: nextAppointmentDate
              ? format(nextAppointmentDate, DATE_ONLY)
              : 'No',
            fontSize: 15,
            fontColor: color.white,
            fontWeight: '700',
          }}
          second={{
            text: 'Upcoming',
            fontSize: 13,
            fontColor: color.text_gray,
            fontWeight: '600',
          }}
        />
      </div>
    </div>
  );
}
