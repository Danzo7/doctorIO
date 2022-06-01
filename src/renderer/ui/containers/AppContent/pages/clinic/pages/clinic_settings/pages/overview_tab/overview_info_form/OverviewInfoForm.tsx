import Input from '@components/inputs/input';
import './style/index.scss';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  description: string;
  location: string;
  phoneNumber: number;
};

interface OverviewInfoFormProps {}
export default function OverviewInfoForm({}: OverviewInfoFormProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => console.log(formData);
  return (
    <div className="overview-info-form">
      <span>Informations</span>
      <Input {...register('name')} label="Name" type={'text'} />
      <Input {...register('description')} label="Description" type={'text'} />
      <Input {...register('location')} label="Location" type={'text'} />
      <Input
        {...register('phoneNumber')}
        label="Phone number"
        type={'number'}
      />
    </div>
  );
}
