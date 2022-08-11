import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '@components/modal_container';
import { useUpdateTestMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { Test } from '../../../../models/instance.model';
import { Overlay } from '@libs/overlay';
interface Inputs {
  [label: string]: string;
}
interface DiagnosisModalProps {
  inputArray?: any[];
  position: number;
}

export default function DiagnosisModal({
  position,
  inputArray = [
    { label: 'weight', type: 'float' },
    { label: 'height', type: 'number' },
    { label: 'Blood pressure', type: 'number' },
    { label: 'bloodType', type: 'text' },
    { label: 'RH', type: 'number' },
  ],
}: DiagnosisModalProps) {
  const [updateTest] = useUpdateTestMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
    const newTest: Test = {
      weight: Number(formData.weight),
      height: Number(formData.height),
      bloodPressure: Number(formData['Blood pressure']),
      bloodType: 'A',
      Rh: true,
    };
    updateTest({ roleId: 1, test: newTest, position: position });
    Overlay.close();
  };
  console.log(errors);
  return (
    <ModalContainer
      title="Diagnosis"
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <>
          <TextButton
            text="Add to queue"
            backgroundColor={colors.good_green}
            radius={7}
            fontSize={14}
            width={'60%'}
            blank
          />
        </>
      }
    >
      {inputArray.map(({ label, type }, index) => (
        <Input
          key={index}
          type={type}
          label={label}
          {...register(label, {
            required: { value: true, message: `${label} is required` },
          })}
          errorMsg={errors[label]?.message}
        />
      ))}
    </ModalContainer>
  );
}
