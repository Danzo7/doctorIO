import './style/index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerReact from 'react-datepicker';
import { ComponentProps } from 'react';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Arrow from 'toSvg/arrow.svg?icon';
import { ControllerProps } from '../input';
import { DATE_DAY, DATE_ONLY } from '@constants/data_format';
export interface DatepickerProps
  extends Omit<ComponentProps<typeof DatePickerReact>, 'onChange'> {
  yearControl?: boolean;
  only?: 'before' | 'after';
}
export default function Datepicker({
  yearControl = false,
  filterDate,
  only,
  field,
  fieldState,
  rules,
  ...props
}: DatepickerProps & ControllerProps) {
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
              tip="Decrease Year"
              onPress={decreaseYear}
              Icon={<Arrow css={{ transform: 'rotate(90deg)' }} />}
            />
          )}
          <SquareIconButton
            tip="Decrease Month"
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
            tip="Increase Month"
            onPress={increaseMonth}
            Icon={<Arrow css={{ transform: 'rotate(-90deg)' }} />}
          />
          {yearControl && (
            <SquareIconButton
              tip="Increase Year"
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
      filterDate={
        filterDate ||
        (only
          ? (date) =>
              only === 'before' ? date <= new Date() : date >= new Date()
          : undefined)
      }
      dateFormat={props.dateFormat ?? yearControl ? DATE_ONLY : DATE_DAY}
      selected={field.value}
      {...props}
      {...others}
    />
  );
}
