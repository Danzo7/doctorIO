import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ModalContainer from '@components/modal_container';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  drugName: string;
  duration: number;
  qts: number;
  comment: string;
};
interface AddDrugModalProps {
  onAdd: () => void;
}
export default function AddDrugModal({ onAdd }: AddDrugModalProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => console.log(formData);
  return (
    <ModalContainer
      title="Add drug"
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <TextButton
          text="Add"
          backgroundColor={color.good_green}
          width="100%"
          fontColor={color.white}
          fontSize={13}
          fontWeight={700}
          blank
        />
      }
    >
      <Input
        {...register('drugName', {
          required: { value: true, message: 'Drug name is required' },
        })}
        label="Drug name"
        type={'text'}
        fillContainer
      />
      <Input
        {...register('duration')}
        label="Duration"
        type={{ type: 'numeric', min: 1, step: 1, unit: 'Day' }}
        inputFill
      />
      <Input
        {...register('qts')}
        label="Qts"
        type={{ type: 'numeric', min: 1, step: 1, unit: '' }}
        inputFill
      />
      <Input
        {...register('comment', {})}
        label="Comment"
        type={'text'}
        fillContainer
      />
    </ModalContainer>
  );
}
