import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '@components/modal_container';
import './style/index.scss';

interface Inputs {
  [label: string]: string;
}
interface DiagnosisModalProps {
  inputArray?: any[];
}
export default function DiagnosisModal({
  inputArray = [
    { label: 'weight', type: 'number' },
    { label: 'Tall', type: 'number' },
    { label: 'Blood pressure', type: 'text' },
    { label: 'Input', type: 'number' },
    { label: 'Input', type: 'text' },
    { label: 'Input', type: 'text' },
  ],
}: DiagnosisModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => console.log(formData);
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
