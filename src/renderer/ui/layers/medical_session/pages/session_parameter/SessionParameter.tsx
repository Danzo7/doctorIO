import ToggleButton from '@components/buttons/toggle_button';
import Header from '@components/header';
import Datepicker from '@components/inputs/datepicker';
import Input from '@components/inputs/input';
import MultipleCheckGroup from '@components/inputs/multiple_check_group';

import { useState } from 'react';
import './style/index.scss';
interface SessionParameterProps {}
export default function SessionParameter({}: SessionParameterProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <div className="session-parameter">
      <Header
        title="Book an appointment"
        buttonNode={<ToggleButton isChecked={true} />}
      />

      <Datepicker selected={selectedDate} onChange={onDateChange} />

      <div className="payment-container">
        <Header
          title="Payment"
          buttonNode={<ToggleButton isChecked={true} />}
        />
        <span>Earnings can be disables in clinic settings</span>
      </div>
      <div className="payment-input-container">
        <MultipleCheckGroup items={['none', '1000', '2000', '3000']} />
        <span>Custom :</span>
        <Input type={'number'} />
      </div>
      <Input type={'checkbox'} label="hand payment to assistant" />
    </div>
  );
}
