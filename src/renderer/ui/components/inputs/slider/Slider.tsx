import './style/index.scss';
import ImageIcon from 'toSvg/image.svg?icon';
interface SliderProps {
  onChange?: (value: number) => void;
  max?: number;
  min?: number;
  step?: number;
  value?: number;
}
export default function Slider({
  max,
  min,
  onChange,
  step,
  value,
}: SliderProps) {
  return (
    <div className="slider-div">
      <ImageIcon width={15} height={15} />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
      />
      <ImageIcon width={20} height={20} />
    </div>
  );
}
