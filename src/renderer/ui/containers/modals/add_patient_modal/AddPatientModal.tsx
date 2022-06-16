import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ModalContainer from '@components/modal_container';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  age: number;
  bloodType: string;
  gender: string;
};
interface AddPatientModalProps {}
export default function AddPatientModal({}: AddPatientModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => console.log(formData); //TODO? form submit
  return (
    <ModalContainer
      title="New patient"
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <>
          <TextButton
            text="Run diagnosis..."
            backgroundColor={color.cold_blue}
            fontSize={14}
            fontWeight={700}
            width={'40%'}
            type="button"
            onPress={
              () => {} //todo:open diagnosisModal
            }
          />
          <TextButton
            text="Add to queue"
            backgroundColor={color.good_green}
            fontSize={14}
            fontWeight={700}
            width={'60%'}
            blank
            type="submit"
          />
        </>
      }
    >
      <Input
        errorMsg={errors.name?.message}
        type="text"
        label="Name"
        {...register('name', {
          required: { value: true, message: 'Name is required' },
        })}
      />
      <Input
        errorMsg={errors.age?.message}
        type="text"
        label="Age"
        {...register('age', {
          min: { value: 1, message: 'min age is 1' },
          max: { value: 99, message: 'max age is 99' },
          required: { value: true, message: 'age is required' },
        })}
      />
      <Input
        errorMsg={errors.bloodType?.message}
        type="text"
        label="Blood type"
        {...register('bloodType', {
          maxLength: 3,
          required: { value: true, message: 'Blood type is required' },
        })}
      />
      <Input
        errorMsg={errors.gender?.message}
        type="text"
        label="Gender"
        {...register('gender', {
          required: { value: true, message: 'Gender is required' },
        })}
      />
    </ModalContainer>
  );
}
