import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Input from '@components/inputs/input';
import { InputControllerContext } from '@components/inputs/input/Input';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  text: string;
  password: string;
  date: Date;
  time: Date;
  select: string;
  number: number;
  textArea: string;
  toggle: boolean;
  checkbox: boolean;
};

export default function Firo() {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      text: '',
      password: '',
      date: new Date(),
      time: new Date(),
      select: 'hello',
      number: 0,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <InputControllerContext.Provider value={control}>
          <Input type={'text'} name="text" />
          <Input type={'password'} name="password" />
          <Input type={'date'} name="date" />
          <Input type={'time'} name="time" />
          <Input
            type={{ type: 'numeric', unit: 'kg', step: 0.1 }}
            name="number"
          />
          <Input
            type={{ type: 'select', options: ['hello', 'world'] }}
            name="select"
          />
          <Input type={'textarea'} name="textArea" />
          <Input type={'checkbox'} name="checkbox" />
        </InputControllerContext.Provider>
        <DarkLightCornerButton type="submit" text="submit" blank />
      </form>
    </div>
  );
}
