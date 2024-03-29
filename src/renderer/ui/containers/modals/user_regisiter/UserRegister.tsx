import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input, { Inputix } from '@components/inputs/input/Input';
import ModalContainer from '@components/modal_container';
import { zodResolver } from '@hookform/resolvers/zod';
import { modal } from '@libs/overlay';
import { useUpdateMemberMutation } from '@redux/clinic/rbac/member/memberApi';
import { useUserStore } from '@stores/userStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(3, 'first name is required'),
  lastName: z.string().min(3, 'last name is required'),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z.string().min(8).optional(),
  age: z.coerce.string().min(2),
  address: z.string().min(3).optional(),
  gender: z.enum(['male', 'female']),
});
interface Inputs {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  age: number;
  email: string;
  phone: string;
  address: string;
}
interface UserRegisterProps {
  defaultValues?: Inputs;
}

export default function UserRegister({ defaultValues }: UserRegisterProps) {
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      firstName: '',
      lastName: '',
      gender: 'male',
      email: '',
      phone: '',
      age: 0,
      address: '',
    },
  });
  const setUser = useUserStore((state) => state.setUser);
  const [updateMember, { isLoading }] = useUpdateMemberMutation();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setUser({
      ...data,
    });
    const modifiedData = Object.keys(dirtyFields).reduce(
      (acc, key) => ({ ...acc, key: data[key as keyof Inputs] }),
      {},
    );
    if (defaultValues) await updateMember(modifiedData);
    modal.close(); //todo specify modal
  };
  return (
    <ModalContainer
      onSubmit={handleSubmit(onSubmit)}
      title="User Registration"
      controls={
        <TextButton
          text={defaultValues ? 'Update' : 'Register'}
          disabled={isLoading}
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
