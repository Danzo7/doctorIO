import TextButton from '@components/buttons/text_button';
import InputField from '@components/inputs/input_field';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
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
        hintText="hint"
        label={'example'}
        errorField={errors.example}
        register={register('example', { required: 'this is required' })}
      />
      <InputField
        hintText="hint"
        label="example2"
        errorField={errors.exampleRequired}
        register={register('exampleRequired', {
          required: 'this is required too',
          minLength: { message: 'are you stupid or what!', value: 5 },
        })}
      />
      <TextButton type="submit" text="submit" />
    </form>
  );
}
