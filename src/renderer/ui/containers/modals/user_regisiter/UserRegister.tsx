import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input, { InputControllerContext } from '@components/inputs/input/Input';
import ModalContainer from '@components/modal_container';
import { zodResolver } from '@hookform/resolvers/zod';
import { Overlay } from '@libs/overlay';
import { setUser } from '@redux/local/user/userSlice';
import { useAppDispatch } from '@store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(3, 'first name is required'),
  lastName: z.string().min(3, 'last name is required'),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z.string().min(8),
});
interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
interface UserRegisterProps {}

export default function UserRegister({}: UserRegisterProps) {
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
    dispatch(setUser(formData));
    Overlay.close();
  };
  return (
    <ModalContainer
      onSubmit={handleSubmit(onSubmit)}
      title="User Registration"
      controls={
        <TextButton
          text={'Register'}
          backgroundColor={color.good_green}
          radius={7}
          fontSize={14}
          width={'60%'}
          blank
        />
      }
    >
      <InputControllerContext.Provider value={control}>
        <Input type="text" label="First name" name="firstName" />
        <Input type="text" label="last name" name="lastName" />
        <Input type="email" label="Email" name="email" />
        <Input type="text" label="Phone number" name="phoneNumber" />
      </InputControllerContext.Provider>
    </ModalContainer>
  );
}
