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
  const {
    control,
    handleSubmit,
    formState: { touchedFields, dirtyFields },
  } = useForm<BiometricScreening>({
    resolver: zodResolver(schema),
    defaultValues: {
      bloodPressure: 0,
      Rh: false,
      height: 0,
      weight: 0,
    },
  });

  return (
    <ModalContainer
      title="Biometric screening"
      onSubmit={handleSubmit((data) =>
        onSubmit(
          Object.fromEntries(
            Object.keys({
              ...touchedFields,
              ...dirtyFields,
              ...(dirtyFields?.bloodType ? { Rh: true } : {}),
            }).map((key) => [
              key as keyof BiometricScreening,
              data[key as keyof BiometricScreening],
            ]),
          ) as unknown as BiometricScreening,
        ),
      )}
      controls={
        <>
          <TextButton
            text={'Save Biometrics'}
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
          touchFirst
        />
        <Input
          type={{ type: 'numeric', unit: 'cm', step: 1 }}
          rules={{ max: 750, minLength: 0 }}
          label="Height"
          name="height"
          touchFirst
        />
        <Input
          type={{ type: 'numeric', unit: 'mmHg' }}
          label="Blood pressure"
          name="bloodPressure"
          touchFirst
        />
        <Input
          type={{
            type: 'multiCheck',
            options: ['A', 'B', 'AB', 'O'],
            onlyOne: true,
          }}
          background="transparent"
          label="Blood type"
          name="bloodType"
          placeholder="Select a blood type"
          leading={<Input type="IconicSwitch" control={control} name="Rh" />}
        />
      </Inputix>
    </ModalContainer>
  );
}
