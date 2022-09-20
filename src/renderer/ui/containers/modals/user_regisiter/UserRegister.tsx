import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input, { Inputix } from '@components/inputs/input/Input';
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
  phoneNumber: z.string().min(8).optional(),
  age: z.string().min(2),
  address: z.string().min(3).optional(),
  gender: z.enum(['male', 'female']),
});
interface Inputs {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  age: string;
  email: string;
  phoneNumber: string;
  address: string;
}
interface UserRegisterProps {}

export default function UserRegister({}: UserRegisterProps) {
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: 'male',
      email: '',
      phoneNumber: '',
      age: '',
      address: '',
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log('form data :', formData);
    dispatch(
      setUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        email: formData.email,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      }),
    );
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
      <Inputix control={control}>
        <Input type="text" label="First name" name="firstName" />
        <Input type="text" label="last name" name="lastName" />
        <Input
          type={{
            type: 'select',
            options: ['male', 'female'],
          }}
          label="Gender"
          name="gender"
        />
        <Input type="text" label="Age" name="age" />
        <Input type="email" label="Email" name="email" />
        <Input type="text" label="Phone number" name="phoneNumber" />
        <Input type="text" label="Address" name="address" />
      </Inputix>
    </ModalContainer>
  );
}
