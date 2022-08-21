import './style/index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerReact from 'react-datepicker';
import { ComponentProps } from 'react';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Calendar from 'toSvg/calendar.svg?icon';
import Arrow from 'toSvg/arrow.svg?icon';
import Input, { ControllerProps } from '../input';
import { DATE_NO_YEAR } from '@constants/data_format';
interface DatepickerProps extends ControllerProps {
  yearControl?: boolean;
}
export default function Datepicker({
  yearControl = false,
  field,
  fieldState,
  rules,
  ...props
}: Omit<ComponentProps<typeof DatePickerReact>, 'onChange'> & DatepickerProps) {
  const { onChange, ...others } = field;
  return (
    <DatePickerReact
      calendarContainer={({ children }) => (
        <div className="datepicker">{children}</div>
      )}
      weekDayClassName={() => 'day-name'}
      dayClassName={() => 'days'}
      renderCustomHeader={({
        monthDate,
        decreaseMonth,
        increaseMonth,
        decreaseYear,
        increaseYear,
      }) => (
        <div className="header">
          {yearControl && (
            <SquareIconButton
              onPress={decreaseYear}
              Icon={<Arrow css={{ transform: 'rotate(90deg)' }} />}
            />
          )}
          <SquareIconButton
            onPress={decreaseMonth}
            Icon={<Arrow css={{ transform: 'rotate(90deg)' }} />}
          />

          <span className="month">
            {monthDate.toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <SquareIconButton
            onPress={increaseMonth}
            Icon={<Arrow css={{ transform: 'rotate(-90deg)' }} />}
          />
          {yearControl && (
            <SquareIconButton
              onPress={increaseYear}
              Icon={<Arrow css={{ transform: 'rotate(-90deg)' }} />}
            />
          )}
        </div>
      )}
      wrapperClassName="date-content"
      onChange={(
        date: Date | [Date | null, Date | null] | null,
        event: React.SyntheticEvent<any, Event> | undefined,
      ) => {
        event?.stopPropagation();
        onChange?.(date, event);
      }}
      dateFormat={props?.dateFormat ?? DATE_NO_YEAR}
      selected={field.value}
      {...props}
      {...others}
    />
  );
}
