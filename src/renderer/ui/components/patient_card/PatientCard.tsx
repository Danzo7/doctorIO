import { ReactNode } from 'react';
import KeyValueItem from './key_value_item';
import './style/index.scss';
interface PatientCardProps {
  data: { [key: string]: string };
  LeftComp?: ReactNode;
}
export default function PatientCard({ data, LeftComp }: PatientCardProps) {
  return (
    <div className="patient-card ">
      {LeftComp}
      <div className="key-value-items">
        {Object.entries(data).map(([key, value]) => (
          <KeyValueItem primaryText={key} secondaryText={value} key={key} />
        ))}
      </div>
    </div>
  );
}
