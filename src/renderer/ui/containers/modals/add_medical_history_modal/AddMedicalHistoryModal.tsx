import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Datepicker from '@components/inputs/datepicker';
import TextArea from '@components/inputs/text_area';
import ModalContainer from '@components/modal_container';
import { Overlay } from '@libs/overlay';
import { useAddMedicalHistoryMutation } from '@redux/instance/record/medical_history_api';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './style/index.scss';

interface AddMedicalHistoryModalProps {
  patientId: number;
}
type Data = {
  description: string;
};
export default function AddMedicalHistoryModal({
  patientId,
}: AddMedicalHistoryModalProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Data>({ mode: 'onChange', defaultValues: { description: '' } });
  const [description, setdescription] = useState(getValues('description'));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onSubmit: SubmitHandler<Data> = (data) => {
    setdescription(data.description);
  };
  const [addMedicalHistory, result] = useAddMedicalHistoryMutation();

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
            if (description.length > 0) {
              addMedicalHistory({
                patientId: patientId,
                body: { date: selectedDate, description: description },
              });
              Overlay.close();
            }
          }}
        />
      }
    >
      <div className="medical-children">
        <TextArea
          fillContainer
          onSubmit={handleSubmit(onSubmit)}
          {...register('description', {
            required: { value: true, message: 'try again' },
          })}
        />
        <span>Choose a date</span>
        <Datepicker selected={selectedDate} onChange={onDateChange} />
      </div>
    </ModalContainer>
  );
}
