import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ModalContainer from '@components/modal_container';
import { DATE_ONLY } from '@constants/data_format';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddMedicalHistoryMutation } from '@redux/instance/record/medical_history_api';
import { Overlay_u } from '@stores/overlayStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import './style/index.scss';

interface AddMedicalHistoryModalProps {
  patientId: number;
}
type Data = {
  description: string;
  selectedDate: Date;
};

const schema = z.object({
  description: z.string().min(3),
  selectedDate: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

export default function AddMedicalHistoryModal({
  patientId,
}: AddMedicalHistoryModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { description: '', selectedDate: new Date() },
  });

  const [addMedicalHistory] = useAddMedicalHistoryMutation();
  const onSubmit: SubmitHandler<Data> = ({ description, selectedDate }) => {
    addMedicalHistory({
      patientId: patientId,
      body: { date: selectedDate, description: description },
    }).then(() => {
      Overlay_u.close();
    });
  };

  return (
    <ModalContainer
      title="Medical history"
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <TextButton
          text="Add"
          backgroundColor={color.good_green}
          width="fit-content"
          alignSelf="center"
          padding={'5px 15px'}
          fontSize={12}
          blank
        />
      }
    >
      <div className="medical-children">
        <Input
          type={'textarea'}
          name="description"
          fillContainer
          placeholder="write something..."
          control={control}
          errorMessage={errors.description?.message}
        />
        <span>Choose a date</span>
        <Input
          type={{
            type: 'date',
            yearControl: true,
            dateFormat: DATE_ONLY,
            only: 'before',
          }}
          name="selectedDate"
          control={control}
        />
      </div>
    </ModalContainer>
  );
}
