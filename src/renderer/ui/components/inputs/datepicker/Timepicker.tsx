import DatePickerReact from 'react-datepicker';
import './style/index.scss';
import { ControllerProps } from '../input';
import { SETTINGS } from '@stores/appSettingsStore';

export default function Timepicker({ field, onChanged }: ControllerProps) {
  const { onChange, ...others } = field;
  return (
    <div css={{ width: '100%', height: '100%' }}>
      <DatePickerReact
        calendarContainer={({ children }) => (
          <div className="datepicker">{children}</div>
        )}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat={SETTINGS.timeFormat}
        preventOpenOnFocus
        onChange={(
          date: Date | [Date | null, Date | null] | null,
          event: React.SyntheticEvent<any, Event> | undefined,
        ) => {
          event?.stopPropagation();
          onChange?.(date, event);
          onChanged?.(date);
        }}
        selected={field.value}
        {...others}
      />
    </div>
  );
}
