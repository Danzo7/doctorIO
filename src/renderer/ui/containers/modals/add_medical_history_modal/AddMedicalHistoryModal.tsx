import { color } from '@assets/styles/color';
import AlertToast from '@components/alert_toast';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ModalContainer from '@components/modal_container';
import { DATE_ONLY } from '@constants/data_format';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_MODAL, Overlay } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useAddMedicalHistoryMutation } from '@redux/instance/record/medical_history_api';
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
  const { open } = useOverlay();
  const [addMedicalHistory] = useAddMedicalHistoryMutation();
  const onSubmit: SubmitHandler<Data> = ({ description, selectedDate }) => {
    addMedicalHistory({
      patientId: patientId,
      body: { date: selectedDate, description: description },
    })
      .then(() => {
        Overlay.close();
        open(
          <AlertToast
            status="Success"
            text="New medical history added successfully"
          />,
          {
            ...DEFAULT_MODAL,
            position: { bottom: '10%' },
            closeBtn: undefined,
          },
        );
      })
      .then(() => {
        setTimeout(() => {
          Overlay.close();
        }, 2000);
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
