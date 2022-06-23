import { DATE_ONLY } from '@constants/data_format';
import { format } from 'date-fns';
import { ReactNode } from 'react';
import KeyValueItem from './key_value_item';
import './style/index.scss';
interface PatientSpecificProps {
  data: { [key: string]: any };
}
interface PatientInfoProps {
  birthDate: Date;
  registerDate: Date;
  activeStatus: 'active' | 'off';
  gender: 'male' | 'female';

  LeftComp?: ReactNode;
}
export function PatientSpecificsCard({ data }: PatientSpecificProps) {
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
  activeStatus,
  birthDate,
  gender,
  registerDate,
  LeftComp,
}: PatientInfoProps) {
  return (
    <div className="patient-card ">
      {LeftComp}
      <div className="key-value-items">
        <KeyValueItem
          primaryText={'Birthday'}
          secondaryText={format(birthDate, DATE_ONLY)}
          width="50%"
        />
        <KeyValueItem
          primaryText={'Gender'}
          secondaryText={gender}
          width="50%"
        />
        <KeyValueItem
          width="50%"
          primaryText={'Register date'}
          secondaryText={format(registerDate, DATE_ONLY)}
        />
        <KeyValueItem
          primaryText={'Status'}
          secondaryText={activeStatus}
          width="50%"
        />
      </div>
    </div>
  );
}
