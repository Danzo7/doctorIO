import ToggleButton from '@components/buttons/toggle_button';
import Header from '@components/header';
import Datepicker from '@components/inputs/datepicker';
import Input from '@components/inputs/input';
import MultipleCheckGroup from '@components/inputs/multiple_check_group';
import { SubmitHandler, useForm } from 'react-hook-form';

import './style/index.scss';
interface SessionParameterProps {}
interface Inputs {
  bookAppointment: boolean;
  bookDate: Date;
  customCost: number;
  payOutside: boolean;
}
export default function SessionParameter({}: SessionParameterProps) {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      bookAppointment: false,
      bookDate: new Date(),
      customCost: 0,
      payOutside: false,
    },
  });

  return (
    <div className="session-parameter">
      <Header
        title="Book an appointment"
        buttonNode={<ToggleButton isChecked={true} />}
      />

      <Input type="date" control={control} grow={false} name={'bookDate'} />

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
        <Input type={'number'} control={control} name={'customCost'} />
      </div>
      <Input
        type={'checkbox'}
        label="hand payment to assistant"
        control={control}
        name="payOutside"
      />
    </div>
  );
}
