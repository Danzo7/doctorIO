import './style/index.scss';
import ImageIcon from 'toSvg/image.svg?icon';
import { color } from '@assets/styles/color';
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
  const val = (((value ?? 1) - (min ?? 1)) / ((max ?? 1) - (min ?? 1))) * 100;
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
        css={{
          '&::-webkit-slider-runnable-track': {
            background: `linear-gradient(to right, ${color.hot_purple} 0%, ${color.hot_purple} ${val}%, ${color.text_gray} ${val}%,  ${color.text_gray} 100%)`,
          },
        }}
      />
      <ImageIcon width={20} height={20} />
    </div>
  );
}
