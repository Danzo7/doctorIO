import BorderSeparator from '@components/border_separator';
import './style/index.scss';
interface PatientSmallCardProps {
  firstName: string;
  lastName: string;
  patId: number;
  age: number;
}
export default function PatientSmallCard({
  firstName,
  lastName,
  patId,
  age,
}: PatientSmallCardProps) {
  return (
    <div className="patient-small-card">
      <span>{firstName + ' ' + lastName + '#' + patId}</span>

      <BorderSeparator direction="vertical" />
      <span>{age}</span>
    </div>
  );
}
