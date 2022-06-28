import DatePickerReact from 'react-datepicker';
import './style/index.scss';
import { ComponentProps, forwardRef } from 'react';
import Clock from 'toSvg/clock.svg?icon';

import Input from '../input';
import { TIME_ONLY } from '@constants/data_format';

export default forwardRef(function Timepicker(
  {
    onChange,
    selected,
  }: Pick<ComponentProps<typeof DatePickerReact>, 'selected' | 'onChange'>,
  ref,
) {
  return (
    <div css={{ width: '12ch' }}>
      <DatePickerReact
        calendarContainer={({ children }) => (
          <div className="datepicker">{children}</div>
        )}
        onChange={onChange}
        selected={selected}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat={TIME_ONLY}
        preventOpenOnFocus
        customInput={<Input type={'text'} trailing={<Clock />} ref={ref} />}
      />
    </div>
  );
});
