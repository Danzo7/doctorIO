import BorderSeparator from '@components/border_separator';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Header from '@components/header';
import Calendar from 'toSvg/calendar.svg?icon';
import Input from '@components/inputs/input';
import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';
import TextButton, { PressHandler } from '@components/buttons/text_button';
import color from '@assets/styles/color';
import { useState } from 'react';
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
    <div className="book-appointment-modal">
      <Header title="Book an appointment" buttonNode={<SquareIconButton />} />
      <div className="book-appointment-info">
        <TextPair first={patientName} second={`#${id}`} />
        <BorderSeparator direction="vertical" />
        <Input
          trailing={<Calendar />}
          type={{ type: 'datetime', date: new Date() }}
          {...{ dateFormat: 'EEEE, dd MMM', selected: selectedDate }}
          onChangeDate={onDateChange}
        />
      </div>
      <TextButton
        text="Create"
        backgroundColor={color.good_green}
        width="fit-content"
        alignSelf="center"
        padding={'5px 10px'}
        fontSize={12}
        onPress={onCreate}
      />
    </div>
  );
}
