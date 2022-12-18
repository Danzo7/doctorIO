import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { Inputix } from '@components/inputs/input/Input';
import ModalContainer from '@components/modal_container';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_MODAL } from '@libs/overlay';
import {
  useAddPatientMutation,
  useUpdatePatientDetailMutation,
} from '@redux/instance/record/patient_api';
import { Overlay_u, modal } from '@stores/overlayStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import AddSelectedToQueueModal from '../add_selected_to_queue_modal';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['male', 'female']),
  birthDate: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  bloodGroup: z.enum(['A', 'B', 'AB', 'O']),
  rh: z.boolean(),
});
type Inputs = z.infer<typeof schema>;
interface AddPatientModalProps {
  defaultValues?: Inputs & { patientId: number };
}
export default function AddPatientModal({
  defaultValues,
}: AddPatientModalProps) {
  const { control, handleSubmit } = useForm<Inputs>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      birthDate: new Date(),
      gender: 'male',
      firstName: '',
      lastName: '',
      rh: true,
    },
  });
  const [addPatient] = useAddPatientMutation();
  const [updatePatientDetail] = useUpdatePatientDetailMutation();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const { firstName, lastName, gender, birthDate, bloodGroup, rh } = formData;
    if (defaultValues) {
      updatePatientDetail({
        id: defaultValues.patientId,
        body: {
          firstName: firstName,
          lastName: lastName,
          sex: gender,
          birthDate: birthDate,
          bloodType: { group: bloodGroup, rh: rh },
        },
      }).then(() => {
        Overlay_u.close();
      });
    } else
      addPatient({
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        sex: gender == ('male' || 'female') ? gender : 'male',
        bloodType: bloodGroup ? { group: bloodGroup, rh: rh } : undefined,
      })
        .unwrap()
        .then((patient) => {
          modal(
            () => (
              <AddSelectedToQueueModal id={patient.id} name={patient.name} />
            ),
            DEFAULT_MODAL,
          ).open();
        });
  };

  return (
    <ModalContainer
      title={defaultValues ? 'Edit patient information' : 'New patient'}
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <>
          <TextButton
            text={defaultValues ? 'Update patient' : 'Add patient'}
            backgroundColor={color.good_green}
            fontSize={14}
            fontWeight={700}
            width={'100%'}
            blank
            type="submit"
          />
        </>
      }
    >
      <Inputix control={control}>
        <Input type="text" label="First name" name="firstName" />
        <Input type="text" label="Last name" name="lastName" />

        <Input
          type={{
            type: 'select',
            options: ['male', 'female'],
          }}
          label="Gender"
          name="gender"
        />
        <Input
          type={{ type: 'date', yearControl: true, only: 'before' }}
          label="Birthday"
          name="birthDate"
        />
        <Input
          type={{
            type: 'multiCheck',
            options: ['A', 'B', 'AB', 'O'],
            onlyOne: true,
          }}
          background="transparent"
          label="Blood type"
          name="bloodGroup"
          placeholder="Select a blood type"
          leading={<Input type="IconicSwitch" control={control} name="rh" />}
        />
      </Inputix>
    </ModalContainer>
  );
}
