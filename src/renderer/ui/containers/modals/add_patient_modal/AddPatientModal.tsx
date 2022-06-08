import { color } from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import Input from '@components/inputs/input';
import { min } from 'date-fns';
import { SubmitHandler, useForm } from 'react-hook-form';
import './style/index.scss';

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
    <div className="add-patient-modal">
      <Header title="New patient" buttonNode={<SquareIconButton />} />
      <form onSubmit={handleSubmit(onSubmit)} className="inputs-container">
        <div className="input-width">
          <Input
            type="text"
            label="Name"
            {...register('name', {
              required: { value: true, message: 'Name is required' },
            })}
          />
        </div>
        <div className="input-width">
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
        </div>
        <div className="input-width">
          <Input
            type="text"
            label="Blood type"
            {...register('bloodType', {
              maxLength: 3,
              required: { value: true, message: 'Blood type is required' },
            })}
          />
        </div>
        <div className="input-width">
          <Input
            type="text"
            label="Gender"
            {...register('gender', {
              required: { value: true, message: 'Gender is required' },
            })}
          />
        </div>
        <div className="add-patient-controls">
          <TextButton
            text="Run diagnosis..."
            backgroundColor={color.cold_blue}
            fontSize={14}
            fontWeight={700}
            width={'40%'}
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
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
        </div>
      </form>
    </div>
  );
}
