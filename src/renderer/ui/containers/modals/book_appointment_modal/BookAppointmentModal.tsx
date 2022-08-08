import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { useState } from 'react';
import Datepicker from '@components/inputs/datepicker';
import ModalContainer from '@components/modal_container';
import { Overlay } from '@libs/overlay';
import { BookedAppointment } from '@models/instance.model';
import { useAppDispatch } from '@store';
import { addBookedAppointment } from '@redux/instance/bookedAppointmentSlice';
interface BookAppointmentModalProps {
  patientName: string;
  id: number;
}
export default function BookAppointmentModal({
  patientName,
  id,
}: BookAppointmentModalProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useAppDispatch();

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
            const newBookApp: BookedAppointment = {
              patientId: id,
              patientName: patientName,
              state: 'PANDING',
              bookDate: selectedDate,
            };
            //REDUX add booked by in newBookApp
            dispatch(addBookedAppointment(newBookApp));
            Overlay.close();
          }}
        />
      }
    >
      <div className="book-appointment-info">
        <TextPair first={patientName} second={`#${id}`} />
        <BorderSeparator direction="vertical" />
        <Datepicker selected={selectedDate} onChange={onDateChange} />
      </div>
    </ModalContainer>
  );
}
