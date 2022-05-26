import './style/index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerReact from 'react-datepicker';
import { ComponentProps } from 'react';
import InputWrapper from '../input_wrapper';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Arrow from 'toSvg/arrow.svg?icon';
export default function Datepicker(
  props: ComponentProps<typeof DatePickerReact>,
) {
  return (
    <InputWrapper>
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
        shouldCloseOnSelect={true}
        {...props}
      />
    </InputWrapper>
  );
}
