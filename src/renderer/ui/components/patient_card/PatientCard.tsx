import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import { DATE_ONLY } from '@constants/data_format';
import { format } from 'date-fns';
import KeyValueItem from './key_value_item';
import './style/index.scss';
interface PatientSpecificProps {
  data: { [key: string]: any };
}
interface PatientInfoProps {
  patientFullName: string;
  patientId: string;
  birthDate: Date;
  registerDate: Date;
  activeStatus: boolean;
  gender: 'male' | 'female';
  numPostAppointment: number;
  nextAppointmentDate?: Date;
}
export function PatientSpecificsCard({ data }: PatientSpecificProps) {
  //TODO remove dead code
  return (
    <div className="patient-card ">
      <div className="key-value-items">
        {Object.entries(data).map(([key, value]) => (
          <KeyValueItem primaryText={key} secondaryText={value} key={key} />
        ))}
      </div>
    </div>
  );
}
export function PatientInfoCard({
  patientFullName,
  patientId,
  activeStatus,
  birthDate,
  gender,
  registerDate,
  numPostAppointment,
  nextAppointmentDate,
}: PatientInfoProps) {
  return (
    <div className="patient-card ">
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
      <BorderSeparator direction="horizontal" />
      <div className="key-value-items">
        <KeyValueItem
          primaryText={'Birthday'}
          secondaryText={format(birthDate, DATE_ONLY)}
          width="fit-content"
        />
        <KeyValueItem
          primaryText={'Gender'}
          secondaryText={gender}
          width="fit-content"
        />
        <KeyValueItem
          width="fit-content"
          primaryText={'Register date'}
          secondaryText={format(registerDate, DATE_ONLY)}
        />
        <KeyValueItem
          primaryText={'Status'}
          secondaryText={activeStatus ? 'active' : 'off'}
          width="fit-content"
        />
      </div>
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
