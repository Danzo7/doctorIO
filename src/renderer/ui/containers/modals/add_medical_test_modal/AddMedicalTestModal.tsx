import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '@components/modal_container';
import { useUpdateTestMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { Test } from '../../../../models/instance.model';
import { Overlay } from '@libs/overlay';
import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';
import InputContainer from '@components/inputs/input_container';

interface Inputs {
  weight: number;
  height: number;
  BloodPressure: number;
  bloodType: 'A' | 'B' | 'AB' | 'O';
  RH: boolean;
}
interface AddMedicalTestModalProps {
  position: number;
}

export default function AddMedicalTestModal({
  position,
}: AddMedicalTestModalProps) {
  const [updateTest] = useUpdateTestMutation();
  const RhOptions = ['Positive', 'Negative'];
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
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
  const changeBloodType = (v: string) => {
    if (v == 'A' || v == 'B' || v == 'AB' || v == 'O') {
      setValue('bloodType', v);
    }
  }; //FIXME:use actual validation with zod
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
      <Input
        errorMsg={errors.weight?.message}
        type="number"
        label="Weight"
        {...register('weight', {
          required: { value: true, message: 'weight is required' },
        })}
      />
      <Input
        errorMsg={errors.height?.message}
        type="number"
        label="Height"
        {...register('height', {
          required: { value: true, message: 'height is required' },
        })}
      />
      <Input
        errorMsg={errors.BloodPressure?.message}
        type="number"
        label="Blood pressure"
        {...register('BloodPressure', {
          required: { value: true, message: 'Blood pressure is required' },
        })}
      />
      <Input
        errorMsg={errors.bloodType?.message}
        type={{
          type: 'select',
          options: ['A', 'B', 'AB', 'O'],
        }}
        label="Blood type"
        {...register(
          'bloodType',

          {
            required: { value: true, message: 'Blood type is required' },
          },
        )}
        onChange={changeBloodType as any}
      />
      {/* <InputContainer label="RH" grow>
        <ToggleButton
          onChange={(checked) => {
            setValue('RH', checked);
          }}
        />
        </InputContainer>  */}
      {
        <InputContainer label="RH" grow>
          <MultiOptionSwitcher
            textList={RhOptions}
            onChange={(selected) => {
              setValue('RH', RhOptions[selected] == 'Positive');
            }}
          />
        </InputContainer>
      }
    </ModalContainer>
  );
}