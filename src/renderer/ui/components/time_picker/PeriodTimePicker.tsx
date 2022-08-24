import './style/index.scss';
import { useForm } from 'react-hook-form';
import {
  START_OF_TIME,
  TIME_ONLY,
  TIME_ONLY_24H,
} from '@constants/data_format';
import Input from '@components/inputs/input';
import { format } from 'date-fns';

interface TimePickerProps {
  title: string;
}
export interface PeriodTimeInputs {
  startTime: string;
  endTime: string;
}
interface Inputs {
  startTime: Date;
  endTime: Date;
}
interface ComponentProps {
  values: PeriodTimeInputs;
  onChange?: (data: PeriodTimeInputs) => void;
}

export default function PeriodTimePicker({
  title,
  values,
  onChange,
}: TimePickerProps & ComponentProps) {
  const { control, getValues } = useForm<Inputs>({
    defaultValues: {
      endTime: new Date(START_OF_TIME + '-' + values.endTime),
      startTime: new Date(START_OF_TIME + '-' + values.startTime),
    },
  });

  return (
    <div className="period-time-picker">
      <span>{title}</span>
      <div className="pickers-container">
        <span>from</span>
        <Input
          type="time"
          control={control}
          name="startTime"
          onChange={() => {
            onChange?.({
              startTime: format(getValues('startTime'), TIME_ONLY_24H),
              endTime: format(getValues('endTime'), TIME_ONLY_24H),
            });
          }}
        />
        <span>to</span>
        <Input
          type="time"
          control={control}
          name="endTime"
          onChange={() => {
            onChange?.({
              startTime: format(getValues('startTime'), TIME_ONLY_24H),
              endTime: format(getValues('endTime'), TIME_ONLY_24H),
            });
          }}
        />
      </div>
    </div>
  );
}
