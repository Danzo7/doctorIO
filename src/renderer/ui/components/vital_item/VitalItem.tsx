import './style/index.scss';
interface VitalItemProps {
  name: string;
  value: string;
  unit?: string;
}
export default function VitalItem({ name, value, unit }: VitalItemProps) {
  return (
    <div className="vital-item">
      <span>{name}</span>
      <div className="values-div">
        <span>{value}</span>
        <span>{unit}</span>
      </div>
    </div>
  );
}
