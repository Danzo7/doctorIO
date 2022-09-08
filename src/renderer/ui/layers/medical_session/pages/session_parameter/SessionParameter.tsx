import ToggleButton from '@components/buttons/toggle_button';
import Header from '@components/header';
import Input from '@components/inputs/input';
import { updateParameter } from '@redux/local/session/sessionSlice';
import { useAppDispatch } from '@store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import './style/index.scss';
interface SessionParameterProps {}
interface Inputs {
  bookDate: Date;
  customCost: number;
  payment: number[];
  payOutside: boolean;
}
export default function SessionParameter({}: SessionParameterProps) {
  const { control, watch } = useForm<Inputs>({
    defaultValues: {
      bookDate: new Date(),
      customCost: 0,
      payment: [],
      payOutside: false,
    },
  });

  const payments = ['1000', '2000', '3000'];
  const [canPay, setCanPay] = useState(false);
  const [willBook, setWillBook] = useState(false);
  const fields = watch();
  const dispatch = useAppDispatch();
  dispatch(
    updateParameter({
      booked: willBook ? fields.bookDate : undefined,
      payment: canPay
        ? +fields.payment.reduce((a, b) => +a + b, 0) +
          Number(fields.customCost)
        : undefined,
      handPayment: canPay ? fields.payOutside : undefined,
    }),
  );
  return (
    <div className="session-parameter">
      <Header
        title="Book an appointment"
        buttonNode={
          <ToggleButton isChecked={willBook} onChange={setWillBook} />
        }
      />

      <Input
        type={{ type: 'date', only: 'after' }}
        control={control}
        grow={false}
        name={'bookDate'}
        disabled={!willBook}
      />

      <div className="payment-container">
        <Header
          title="Payment"
          buttonNode={<ToggleButton isChecked={canPay} onChange={setCanPay} />}
        />
        <span>Earnings can be disables in clinic settings</span>
      </div>
      <div className="payment-input-container">
        <Input
          control={control}
          name="payment"
          type={{ type: 'multiCheck', options: payments }}
          disabled={!canPay}
        ></Input>
        <span>Custom :</span>
        <Input
          type={'number'}
          control={control}
          name={'customCost'}
          disabled={!canPay}
        />
      </div>
      <Input
        type={'checkbox'}
        label="hand payment to assistant"
        control={control}
        name="payOutside"
        disabled={!canPay}
      />
    </div>
  );
}
