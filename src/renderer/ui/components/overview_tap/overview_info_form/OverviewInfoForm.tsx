import Input from '@components/inputs/input';
import './style/index.scss';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  description: string;
  Location: string;
  PhoneNumber: number;
};

interface OverviewInfoFormProps {}
export default function OverviewInfoForm({}: OverviewInfoFormProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => console.log(formData);
  return (
    <div className="overview-info-form">
      <span>Informations</span>
      <Input label="Name" type={'text'} />
      <Input label="Description" type={'text'} />
      <Input label="Location" type={'text'} />
      <Input label="Phone number" type={'number'} />
    </div>
  );
}
