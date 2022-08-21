import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Datepicker from '@components/inputs/datepicker';
import Input from '@components/inputs/input';
import { InputControllerContext } from '@components/inputs/input/Input';
import InputContainer from '@components/inputs/input_container';
import ModalContainer from '@components/modal_container';
import { DATE_ONLY } from '@constants/data_format';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useAddQueueAppointmentMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useAddPatientMutation } from '@redux/instance/record/patient_api';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import AddSelectedToQueueModal from '../add_selected_to_queue_modal';

type Inputs = {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
};
interface AddPatientModalProps {}
export default function AddPatientModal({}: AddPatientModalProps) {
  const [AddQueueAppointment] = useAddQueueAppointmentMutation();
  const { setValue, control, handleSubmit } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { birthDate: new Date(), gender: 'male' },
  });

  const { open } = useOverlay();
  const [addPatient] = useAddPatientMutation();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const { firstName, lastName, gender, birthDate } = formData;
    addPatient({
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      sex: gender == ('male' || 'female') ? gender : 'male',
    })
      .unwrap()
      .then((patient) => {
        open(
          <AddSelectedToQueueModal
            id={patient.id}
            name={patient.name}
            onAdd={() => {
              AddQueueAppointment({
                roleId: 1,
                body: { patientId: patient.id },
              });
            }}
          />,
          DEFAULT_MODAL,
        );
      });
  };

  return (
    <ModalContainer
      title="New patient"
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <>
          <TextButton
            text="Add patient"
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
      <InputControllerContext.Provider value={control}>
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
        <Input type="text" label="Birthday" name="birthDate" />
      </InputControllerContext.Provider>
    </ModalContainer>
  );
}
