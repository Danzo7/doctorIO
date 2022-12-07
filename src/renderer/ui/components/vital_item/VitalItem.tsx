import { color } from '@assets/styles/color';
import './style/index.scss';
interface VitalItemProps {
  name: string;
  value: string;
  unit?: string;
  backgroundColor?: string;
}
export default function VitalItem({
  name,
  value,
  unit,
  backgroundColor = color.darkersec_color,
}: VitalItemProps) {
  return (
    <div className="vital-item" css={{ backgroundColor: backgroundColor }}>
      <span>{name}</span>
      <div className="values-div">
        <span>{value}</span>
        <span>{unit}</span>
      </div>
    </div>
  );
}
