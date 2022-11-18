import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '@components/modal_container';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Inputix } from '@components/inputs/input/Input';
import { numericString } from '@helpers/zod.helper';
import { BiometricScreening } from '@models/instance.model';

const schema = z.object({
  weight: numericString(z.number().optional()),

  height: numericString(z.number().optional()),
  bloodPressure: numericString(z.number().optional()),
  bloodType: z.enum(['A', 'B', 'AB', 'O']),
  Rh: z.boolean(),
});
interface AddMedicalTestModalProps {
  onSubmit: SubmitHandler<BiometricScreening>;
}

export default function AddMedicalTestModal({
  onSubmit,
}: AddMedicalTestModalProps) {
  const { control, handleSubmit } = useForm<BiometricScreening>({
    resolver: zodResolver(schema),
    defaultValues: {
      bloodType: 'A',
      bloodPressure: 0,
      Rh: false,
      height: 0,
      weight: 0,
    },
  });

  return (
    <ModalContainer
      title="Biometric screening"
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <>
          <TextButton
            text={'Add Biometric screening'}
            backgroundColor={colors.good_green}
            radius={7}
            fontSize={14}
            width={'60%'}
            blank
            type="submit"
          />
        </>
      }
    >
      <Inputix control={control}>
        {/* TODO must add a toggle to enable each input and add a button to add more custom inputs */}
        <Input
          type={{ type: 'numeric', unit: 'kg' }}
          label="Weight"
          name="weight"
          control={control}
        />
        <Input
          type={{ type: 'numeric', unit: 'cm', step: 1 }}
          rules={{ max: 750, minLength: 0 }}
          label="Height"
          name="height"
        />
        <Input
          type={{ type: 'numeric', unit: 'mmHg' }}
          label="Blood pressure"
          name="bloodPressure"
        />
        <Input
          type={{
            type: 'select',
            options: ['A', 'B', 'AB', 'O'],
          }}
          label="Blood type"
          name="bloodType"
        />
        <Input type="checkbox" label="RH" name="Rh" />
      </Inputix>
    </ModalContainer>
  );
}
