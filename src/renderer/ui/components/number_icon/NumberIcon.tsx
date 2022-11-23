import { color } from '@assets/styles/color';
import './style/index.scss';
interface NumberIconProps {
  backgroundColor?: string;
  size?: number;
  value: number;
}
export default function NumberIcon({
  backgroundColor = color.good_green,
  size = 40,
  value,
}: NumberIconProps) {
  const valueLength = value.toString().length;
  return (
    <div
      className="number-icon"
      css={{
        backgroundColor: backgroundColor,
        width: valueLength == 1 ? size : size + valueLength * 5,
        height: valueLength == 1 ? size : size + valueLength * 5,
      }}
    >
      <span>{value}</span>
    </div>
  );
}
