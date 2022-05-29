import TextButton from '@components/buttons/text_button';
import './style/index.scss';
import Clock from 'toSvg/clock.svg?icon';
import { color } from '@assets/styles/color';

interface TimePickerProps {
  timePickerTitle: string;
}
export default function TimePicker({ timePickerTitle }: TimePickerProps) {
  return (
    <div className="time-picker">
      <span>{timePickerTitle}</span>
      <div className="pickers-container">
        <span>from</span>
        <TextButton
          text="08:30"
          Icon={Clock}
          borderColor={'#7B61FF'} // i will put the color later  //
          fontColor={color.text_gray}
          fontSize={14}
          fontWeight={400}
          alignment="baseline"
          itemsDirection="row-reverse"
        />
        <span>to</span>
        <TextButton
          text="08:30"
          Icon={Clock}
          borderColor={'#7B61FF'}
          fontColor={color.text_gray}
          fontSize={14}
          fontWeight={400}
          alignment="baseline"
          itemsDirection="row-reverse"
        />
      </div>
    </div>
  );
}
