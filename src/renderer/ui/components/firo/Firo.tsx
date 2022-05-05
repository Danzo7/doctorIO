import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import InputField from '@components/inputs/input_field';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  password: string;
  moms: string;
};

export default function Firo() {
  const {
    register,
    handleSubmit,
    //  watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // console.log(watch('example')); // watch input value by passing the name of it
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        css={{
          backgroundColor: 'hotpink',
          '&:hover': {
            color: 'lightgreen',
          },
        }}
      >
        This has ahotpink background.
      </div>
      <InputField
        placeholder="write something long"
        label="password"
        errorField={errors.password}
        register={register('password', { required: 'this is required' })}
      />
      <InputField
        hintText="write your mom's name"
        label="mom's name"
        errorField={errors.moms}
        register={register('moms', {
          required: 'this is required too',
          minLength: { message: 'are you stupid or what! ', value: 5 },
        })}
      />
      <DarkLightCornerButton type="submit" title="submit" />
    </form>
  );
}
