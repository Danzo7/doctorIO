import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Datepicker from '@components/inputs/datepicker';
import TextArea from '@components/inputs/text_area';
import ModalContainer from '@components/modal_container';
import { Overlay } from '@libs/overlay';
import { useState } from 'react';
import './style/index.scss';

interface AddMedicalHistoryModalProps {}
export default function AddMedicalHistoryModal({}: AddMedicalHistoryModalProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <ModalContainer
      title="Medical history"
      controls={
        <TextButton
          text="Add"
          backgroundColor={color.good_green}
          width="fit-content"
          alignSelf="center"
          padding={'5px 15px'}
          fontSize={12}
          onPress={() => {
            Overlay.close();
          }}
        />
      }
    >
      <div className="medical-children">
        <TextArea fillContainer />
        <span>Choose a date</span>
        <Datepicker selected={selectedDate} onChange={onDateChange} />
      </div>
    </ModalContainer>
  );
}
