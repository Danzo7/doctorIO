import './style/index.scss';
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
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
    />
  );
}
