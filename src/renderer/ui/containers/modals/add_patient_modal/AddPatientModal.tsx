import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Datepicker from '@components/inputs/datepicker';
import Input from '@components/inputs/input';
import InputContainer from '@components/inputs/input_container';
import ModalContainer from '@components/modal_container';
import { DATE_ONLY } from '@constants/data_format';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import {} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { birthDate: selectedDate, gender: 'male' },
  });

  const { open } = useOverlay();
  const onDateChange = (date: Date) => {
    setSelectedDate(date);
    setValue('birthDate', date);
  };
  const changeGender = (v: string) => {
    if (v == 'male' || v == 'female') {
      setValue('gender', v);
    }
  };
  const [addPatient] = useAddPatientMutation();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    // console.log(formData);
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
          <AddSelectedToQueueModal id={patient.id} name={patient.name} />,
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
          {/* <TextButton
            text="Run Test..."
            backgroundColor={color.cold_blue}
            fontSize={14}
            fontWeight={700}
            width={'40%'}
            type="button"
            onPress={() => {
              console.log(patientId);
              if (appointmentsQuery.isSuccess && patientId) {
                const position = appointmentsQuery.data.find(
                  (app) => app.patientId == patientId,
                )?.position;
                if (position)
                  open(<MedicalTestModal position={position} />, DEFAULT_MODAL);
              }
            }}
          /> */}
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
      <Input
        errorMsg={errors.firstName?.message}
        type="text"
        label="First name"
        {...register('firstName', {
          required: { value: true, message: 'first name is required' },
        })}
      />
      <Input
        errorMsg={errors.lastName?.message}
        type="text"
        label="Last name"
        {...register('lastName', {
          required: { value: true, message: 'last name is required' },
        })}
      />

      <Input
        errorMsg={errors.gender?.message}
        type={{
          type: 'select',
          options: ['male', 'female'],
          defaultSelected: 'male',
        }}
        label="Gender"
        {...register(
          'gender',

          {
            required: { value: true, message: 'Gender is required' },
          },
        )}
        onChange={changeGender as any}
        //     setValue={changeGender}
      />
      <InputContainer label="Birthday">
        <Datepicker
          selected={selectedDate}
          onChange={onDateChange}
          showYearDropdown
          dateFormat={DATE_ONLY}
          yearDropdownItemNumber={15}
          scrollableYearDropdown
          yearControl
        />
      </InputContainer>
    </ModalContainer>
  );
}
