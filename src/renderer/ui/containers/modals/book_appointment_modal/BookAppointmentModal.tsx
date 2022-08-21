import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';

import ModalContainer from '@components/modal_container';
import { Overlay } from '@libs/overlay';
import { useBookAppointmentMutation } from '@redux/instance/Appointment/AppointmentApi';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  const [BookAppointment, _] = useBookAppointmentMutation();
  const { control, handleSubmit } = useForm<Inputs>({
    mode: 'onSubmit',
  });
  const onSubmit: SubmitHandler<Inputs> = ({ date, subject }) => {
    BookAppointment({
      patientId: id,
      body: { date: date, subject: subject },
    });

    Overlay.close();
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
      <div className="book-appointment-info">
        <TextPair first={patientName} second={`#${id}`} />
        <Input type="text" label="Subject" control={control} name={'subject'} />
        <Input type="text" label="Subject" control={control} name={'date'} />
      </div>
    </ModalContainer>
  );
}
