import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import { useBookAppointmentMutation } from '@redux/instance/Appointment/AppointmentApi';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DATE_ONLY } from '@constants/data_format';
import { Overlay_u } from '@stores/overlayStore';
import { useQueueSelectionStore } from '@stores/queueSelectionStore';

type Inputs = {
  subject: string;
  date: Date;
};
interface BookAppointmentModalProps {
  patientName: string;
  id: number;
}
export default function BookAppointmentModal({
  patientName,
  id,
}: BookAppointmentModalProps) {
  const selectedQueue = useQueueSelectionStore.getState().selectedQueue;
  const [BookAppointment, _] = useBookAppointmentMutation();
  const { control, handleSubmit } = useForm<Inputs>({
    mode: 'onSubmit',
    defaultValues: { date: new Date(), subject: '' },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ date, subject }) => {
    // console.log({ selectedQueue, id });
    BookAppointment({
      selectedQueue: selectedQueue,
      patientId: id,
      body: { date: date, subject: subject },
    });

    Overlay_u.clear();
  };

  return (
    <ModalContainer
      title="Book an appointment"
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <TextButton
          text="Create"
          backgroundColor={color.good_green}
          width="fit-content"
          alignSelf="center"
          padding={'5px 10px'}
          fontSize={12}
          blank
        />
      }
    >
      <div css={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="book-appointment-info">
          <TextPair first={patientName} second={`#${id}`} />
          <BorderSeparator direction="vertical" />
          <Input
            type={{
              type: 'date',
              yearControl: false,
              dateFormat: DATE_ONLY,
              only: 'after',
            }}
            control={control}
            name={'date'}
          />
        </div>
        <Input
          type="text"
          label="Subject (optional)"
          control={control}
          name={'subject'}
        />
      </div>
    </ModalContainer>
  );
}
