import './style/index.scss';
import { Timepicker } from '@components/inputs/datepicker';
import { useForm, Controller } from 'react-hook-form';
import { START_OF_TIME } from '@constants/data_format';
import { dateToTime } from '@helpers/date.helper';

interface TimePickerProps {
  title: string;
}
interface ComponentProps {
  startTime: string;
  endTime: string;
  onChange?: (data: { startTime: string; endTime: string }) => void;
}
interface Input {
  startTime: Date;
  endTime: Date;
}
export default function PeriodTimePicker({
  title,
  endTime,
  startTime,
  onChange,
}: TimePickerProps & ComponentProps) {
  const { control, getValues } = useForm<Input>({
    defaultValues: {
      endTime: new Date(START_OF_TIME + '-' + endTime),
      startTime: new Date(START_OF_TIME + '-' + startTime),
    },
  });
  return (
    <div className="period-time-picker">
      <span>{title}</span>
      <div className="pickers-container">
        <span>from</span>
        <Controller
          control={control}
          name="startTime"
          render={({ field }) => (
            <Timepicker
              onChange={(date) => {
                field.onChange(date);
                if (onChange)
                  onChange({
                    startTime: dateToTime(getValues().startTime),
                    endTime: dateToTime(getValues().endTime),
                  });
              }}
              selected={field.value}
            />
          )}
        />
        <span>to</span>
        <Controller
          control={control}
          name="endTime"
          render={({ field }) => (
            <Timepicker
              onChange={(date) => {
                field.onChange(date);
                if (onChange)
                  onChange({
                    startTime: dateToTime(getValues().startTime),
                    endTime: dateToTime(getValues().endTime),
                  });
              }}
              selected={field.value}
            />
          )}
        />
      </div>
    </div>
  );
}
