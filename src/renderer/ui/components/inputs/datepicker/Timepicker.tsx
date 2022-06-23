import DatePickerReact from 'react-datepicker';
import './style/index.scss';
import { useState } from 'react';
import Clock from 'toSvg/clock.svg?icon';

import Input from '../input';
import { TIME_ONLY } from '@constants/data_format';
interface TimepickerProps {}

export default function Timepicker({}: TimepickerProps) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div css={{ width: '12ch' }}>
      <DatePickerReact
        calendarContainer={({ children }) => (
          <div className="datepicker">{children}</div>
        )}
        onChange={(
          date: Date,
          event: React.SyntheticEvent<any, Event> | undefined,
        ) => {
          event?.stopPropagation();
          if (date != null) setStartDate(date);
        }}
        selected={startDate}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat={TIME_ONLY}
        preventOpenOnFocus
        customInput={<Input type={'text'} trailing={<Clock />} />}
      />
    </div>
  );
}
