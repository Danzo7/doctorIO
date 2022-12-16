import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import IconicButton from '@components/buttons/iconic_button';
import TextPair from '@components/text_pair/TextPair';
import { SETTINGS } from '@stores/appSettingsStore';

import { BloodType } from '@models/instance.model';
import { format } from 'date-fns';
import KeyValueItem from './key_value_item';
import './style/index.scss';
import Edit from 'toSvg/pencil.svg?icon';
interface PatientSpecificProps {
  data: { [key: string]: any };
}
interface PatientInfoProps {
  patientFullName: string;
  patientId: string;
  birthDate: Date;
  registerDate: Date;
  bloodType?: BloodType;
  gender: 'male' | 'female';
  numPostAppointment: number;
  nextAppointmentDate?: Date;
}
export function PatientSpecificsCard({ data }: PatientSpecificProps) {
  //TODO remove dead code
  return (
    <div className="patient-card ">
      <div className="key-value-items">
        {Object.entries(data).map(([key, value]) =>
          key === 'bloodType' ? (
            <TextPair
              gap={2}
              width={'30%'}
              first={{
                text: key,
                fontSize: 12,
                fontWeight: 600,
                fontColor: color.silver_gray,
              }}
              second={{
                text: (value as BloodType).rh
                  ? '+'
                  : '-' + (value as BloodType).group,
                fontSize: 15,
                fontWeight: 700,
                fontColor: color.cold_blue,
              }}
              key={key}
            />
          ) : (
            <KeyValueItem primaryText={key} secondaryText={value} key={key} />
          ),
        )}
      </div>
    </div>
  );
}
export function PatientInfoCard({
  patientFullName,
  patientId,
  bloodType,
  birthDate,
  gender,
  registerDate,
  numPostAppointment,
  nextAppointmentDate,
}: PatientInfoProps) {
  return (
    <div className="patient-card ">
      <IconicButton
        css={{ position: 'absolute', right: 10 }}
        tip="Edit"
        blank
        width={25}
        radius={7}
        backgroundColor={color.cold_blue}
        Icon={<Edit width={10} height={10} />}
      />
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
          secondaryText={format(birthDate, SETTINGS.dateFormat)}
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
          secondaryText={format(registerDate, SETTINGS.dateFormat)}
        />
        {bloodType && (
          <TextPair
            gap={2}
            first={{
              text: 'Blood type',
              fontSize: 12,
              fontWeight: 600,
              fontColor: color.silver_gray,
            }}
            second={{
              text: (bloodType.rh ? '+' : '-') + bloodType.group,
              fontSize: 15,
              fontWeight: 700,
              fontColor: color.cold_blue,
            }}
          />
        )}
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
              ? format(nextAppointmentDate, SETTINGS.dateFormat)
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
