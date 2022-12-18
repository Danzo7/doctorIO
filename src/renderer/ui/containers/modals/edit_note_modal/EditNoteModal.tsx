import ModalContainer from '@components/modal_container';
import './style/index.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { z } from 'zod';
import Input from '@components/inputs/input';

const schema = z.object({
  note: z.string().min(3),
});
type Data = {
  note: string;
};

interface EditNoteModalProps {
  defaultValue?: string;
}
export default function EditNoteModal({ defaultValue }: EditNoteModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { note: defaultValue ?? '' },
  });
  const onSubmit: SubmitHandler<Data> = ({ note }) => {};

  return (
    <div className="edit-note-modal">
      <ModalContainer
        title="Edit note"
        gap={5}
        onSubmit={handleSubmit(onSubmit)}
        controls={
          <TextButton
            text="Save"
            backgroundColor={color.good_green}
            width="fit-content"
            alignSelf="center"
            padding={'5px 15px'}
            fontSize={12}
            blank
          />
        }
      >
        <Input
          type={'textarea'}
          name="note"
          fillContainer
          placeholder="write something..."
          control={control}
          errorMessage={errors.note?.message}
        />
      </ModalContainer>
    </div>
  );
}
