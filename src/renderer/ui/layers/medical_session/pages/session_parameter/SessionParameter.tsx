import ToggleButton from '@components/buttons/toggle_button';
import Header from '@components/header';
import Input from '@components/inputs/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './style/index.scss';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMedicalSessionStore } from '@stores/medicalSessionStore';
const schema = z.object({
  payment: z.number().min(0).max(4000).array().optional(),
  customCost: z.number().optional(),
  bookDate: z.string().optional(),
  payOutside: z.boolean().optional(),
});
interface SessionParameterProps {}
interface Inputs {
  bookDate: Date;
  customCost: number;
  payment: number[];
  handPayment: boolean;
}

export default function SessionParameter({}: SessionParameterProps) {
  const { control, watch } = useForm<Inputs>({
    defaultValues: {
      bookDate: new Date(),
      customCost: 0,
      payment: [],
      handPayment: false,
    },
    resolver: zodResolver(schema),
  });

  const payments = ['1000', '2000', '3000'];
  const [canPay, setCanPay] = useState(false);
  const [willBook, setWillBook] = useState(false);
  const fields = watch();
  useMedicalSessionStore.getState().setParameter({
    booked: willBook ? fields.bookDate : undefined,
    payment: canPay
      ? {
          value:
            Number(fields.payment.reduce((a, b) => Number(a) + Number(b), 0)) +
            Number(fields.customCost),
          isHandPayment: fields.handPayment,
        }
      : undefined,
  });

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
          type={{
            type: 'multiCheck',
            groupItemType: { name: 'TextButton', options: payments },
          }}
          disabled={!canPay}
        ></Input>
        <span>Custom :</span>
        <Input
          type={{ type: 'numeric', step: 100, unit: '$' }}
          rules={{ min: 0, max: 10000000 }}
          control={control}
          name={'customCost'}
          disabled={!canPay}
        />
      </div>
      <Input
        type={'checkbox'}
        label="hand payment to assistant"
        control={control}
        name="handPayment"
        disabled={!canPay}
      />
    </div>
  );
}
