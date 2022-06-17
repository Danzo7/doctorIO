import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';
import TextButton, { PressHandler } from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { useState } from 'react';
import Datepicker from '@components/inputs/datepicker';
import ModalContainer from '@components/modal_container';
interface BookAppointmentModalProps {
  patientName: string;
  id: string;
  onCreate: PressHandler;
}
export default function BookAppointmentModal({
  patientName,
  id,
  onCreate,
}: BookAppointmentModalProps) {
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
          onPress={onCreate}
        />
      }
    >
      <div className="book-appointment-info">
        <TextPair first={patientName} second={`#${id}`} />
        <BorderSeparator direction="vertical" />
        <Datepicker
          selected={selectedDate}
          onChange={onDateChange}
          dateFormat="EEEE, dd MMM"
        />
      </div>
    </ModalContainer>
  );
}
