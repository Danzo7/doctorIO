import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { useState } from 'react';
import Datepicker from '@components/inputs/datepicker';
import ModalContainer from '@components/modal_container';
import { Overlay } from '@libs/overlay';
import { useBookAppointmentMutation } from '@redux/instance/Appointment/AppointmentApi';
import Input from '@components/inputs/input';
import { useForm } from 'react-hook-form';
import InputContainer from '@components/inputs/input_container';

type Inputs = {
  subject: string;
};
interface BookAppointmentModalProps {
  patientName: string;
  id: number;
}
export default function BookAppointmentModal({
  patientName,
  id,
}: BookAppointmentModalProps) {
  const [BookAppointment, result] = useBookAppointmentMutation();
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onSubmit',
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const onDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <ModalContainer
      title="Book an appointment"
      controls={
        <TextButton
          text="Create"
          backgroundColor={color.good_green}
          width="fit-content"
          alignSelf="center"
          padding={'5px 10px'}
          fontSize={12}
          onPress={() => {
            BookAppointment({
              patientId: id,
              body: { date: selectedDate, subject: getValues('subject') },
            });
            Overlay.close();
          }}
        />
      }
    >
      <div className="book-appointment-info">
        <TextPair first={patientName} second={`#${id}`} />
        <Input
          errorMsg={errors.subject?.message}
          type="text"
          label="Subject"
          {...register('subject', {})}
        />
        <InputContainer label="Choose a date" grow>
          <Datepicker selected={selectedDate} onChange={onDateChange} />
        </InputContainer>
      </div>
    </ModalContainer>
  );
}
