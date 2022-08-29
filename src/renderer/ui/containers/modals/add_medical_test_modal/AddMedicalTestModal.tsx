import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '@components/modal_container';
import { useUpdateTestMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { Test } from '../../../../models/instance.model';
import { Overlay } from '@libs/overlay';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputControllerContext } from '@components/inputs/input/Input';

interface Inputs {
  weight: number;
  height: number;
  BloodPressure: number;
  bloodType: 'A' | 'B' | 'AB' | 'O';
  RH: boolean;
}

const schema = z.object({
  weight: z
    .number({ required_error: 'Weight is required' })
    .gt(0, 'Weight is required'),
  height: z
    .number({ required_error: 'Height is required' })
    .gt(0, 'Height is required'),
  BloodPressure: z.number().gt(0, 'Blood Pressure is required'),
  bloodType: z.enum(['A', 'B', 'AB', 'O']),
  RH: z.boolean(),
});
interface AddMedicalTestModalProps {
  position: number;
}

export default function AddMedicalTestModal({
  position,
}: AddMedicalTestModalProps) {
  const [updateTest] = useUpdateTestMutation();
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      bloodType: 'A',
      BloodPressure: 0,
      RH: false,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
    const newTest: Test = {
      weight: Number(formData.weight),
      height: Number(formData.height),
      bloodPressure: Number(formData.BloodPressure),
      bloodType: formData.bloodType,
      Rh: formData.RH,
    };
    updateTest({ roleId: 1, test: newTest, position: position });

    Overlay.close();
  };

  return (
    <ModalContainer
      title="Medical test"
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <>
          <TextButton
            text={'Add Test'}
            backgroundColor={colors.good_green}
            radius={7}
            fontSize={14}
            width={'60%'}
            blank
          />
        </>
      }
    >
      <InputControllerContext.Provider value={control}>
        <Input type="number" label="Weight" name="weight" />
        <Input type="number" label="Height" name="height" />
        <Input
          type={{ type: 'numeric', unit: '' }}
          label="Blood pressure"
          name="BloodPressure"
          //FIXME min value on input type=numeric not working (shows NAN) 
        />
        <Input
          type={{
            type: 'select',
            options: ['A', 'B', 'AB', 'O'],
          }}
          label="Blood type"
          name="bloodType"
        />
        {/* <InputContainer label="RH" grow>
        <ToggleButton
          onChange={(checked) => {
            setValue('RH', checked);
          }}
        />
        </InputContainer>  */}
        {/* {
          <InputContainer label="RH" grow>
            <MultiOptionSwitcher
              textList={RhOptions}
              onChange={(selected) => {
                setValue('RH', RhOptions[selected] == 'Positive');
              }}
            />//TODO add multiOptionSwitcher to input component
          </InputContainer>
        } */}
        <Input type="checkbox" label="RH" name="RH" />
      </InputControllerContext.Provider>
    </ModalContainer>
  );
}
