import './style/index.scss';
import { Timepicker } from '@components/inputs/datepicker';

interface TimePickerProps {
  timePickerTitle: string;
}
export default function PeriodTimePicker({ timePickerTitle }: TimePickerProps) {
  return (
    <div className="period-time-picker">
      <span>{timePickerTitle}</span>
      <div className="pickers-container">
        <span>from</span>
        <Timepicker />
        <span>to</span>
        <Timepicker />
      </div>
    </div>
  );
}
/*        <TextButton
          text="08:30"
          Icon={Clock}
          borderColor={'#7B61FF'}
          fontColor={color.text_gray}
          fontSize={14}
          fontWeight={400}
          alignment="baseline"
          itemsDirection="row-reverse"
        />*/
