import './style/index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerReact from 'react-datepicker';
import { ComponentProps } from 'react';
import InputWrapper from '../input_wrapper';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Calendar from 'toSvg/calendar.svg?icon';
import Arrow from 'toSvg/arrow.svg?icon';
export default function Datepicker({
  onChange,
  ...props
}: ComponentProps<typeof DatePickerReact>) {
  return (
    <InputWrapper trailing={<Calendar />}>
      <DatePickerReact
        calendarContainer={({ children }) => (
          <div className="datepicker">{children}</div>
        )}
        weekDayClassName={() => 'day-name'}
        dayClassName={() => 'days'}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
          <div className="header">
            <SquareIconButton
              onPress={decreaseMonth}
              svg={<Arrow css={{ transform: 'rotate(90deg)' }} />}
            />

            <span className="month">
              {monthDate.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <SquareIconButton
              onPress={increaseMonth}
              svg={<Arrow css={{ transform: 'rotate(-90deg)' }} />}
            />
          </div>
        )}
        wrapperClassName="date-content"
        onChange={(
          date: Date | [Date | null, Date | null] | null,
          event: React.SyntheticEvent<any, Event> | undefined,
        ) => {
          event?.stopPropagation();
          onChange(date, event);
        }}
        {...props}
      />
    </InputWrapper>
  );
}
