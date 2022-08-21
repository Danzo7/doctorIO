import './style/index.scss';
import { Timepicker } from '@components/inputs/datepicker';
import { useForm, Controller } from 'react-hook-form';
import { START_OF_TIME } from '@constants/data_format';
import { dateToTime } from '@helpers/date.helper';
import Input from '@components/inputs/input';

interface TimePickerProps {
  title: string;
}
interface ComponentProps {
  startTime: string;
  endTime: string;
  onChange?: (data: { startTime: string; endTime: string }) => void;
}
interface Inputs {
  startTime: Date;
  endTime: Date;
}
export default function PeriodTimePicker({
  title,
  endTime,
  startTime,
}: TimePickerProps & ComponentProps) {
  const { control, watch } = useForm<Inputs>({
    defaultValues: {
      endTime: new Date(START_OF_TIME + '-' + endTime),
      startTime: new Date(START_OF_TIME + '-' + startTime),
    },
  });
  console.log(watch());
  return (
    <div className="period-time-picker">
      <span>{title}</span>
      <div className="pickers-container">
        <span>from</span>
        <Input type="time" control={control} name="startTime" />
        <span>to</span>
        <Input type="time" control={control} name="endTime" />
      </div>
    </div>
  );
}
