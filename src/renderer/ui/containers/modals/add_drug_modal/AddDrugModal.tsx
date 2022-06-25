import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ModalContainer from '@components/modal_container';
import { Overlay } from '@libs/overlay';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  drugName: string;
  qts: number;
  dose: number;
  duration: number;
  comment: string;
};
interface AddDrugModalProps {
  onSubmitPress: (data: any) => void;
  defaultValues?: Inputs;
}
export default function AddDrugModal({
  onSubmitPress,
  defaultValues,
}: AddDrugModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: defaultValues });
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    if (!defaultValues) {
      onSubmitPress(formData);
    }

    Overlay.close();
  };

  return (
    <ModalContainer
      title={defaultValues ? 'Edit drug' : ' Add drug'}
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <TextButton
          text={defaultValues ? 'Edit' : ' Add'}
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
        errorMsg={errors.drugName?.message}
        type={'text'}
        fillContainer
      />
      <Input
        {...register('qts', {
          min: { value: 1, message: 'min value is 1 ' },
          required: { value: true, message: 'qts is required' },
        })}
        label="Qts"
        errorMsg={errors.qts?.message}
        type={{ type: 'numeric', min: 1, step: 1, unit: '' }}
      />
      <Input
        {...register('dose', {
          min: { value: 1, message: 'min value is 1 ' },
          required: { value: true, message: 'dose is required' },
        })}
        label="dose"
        errorMsg={errors.dose?.message}
        type={{ type: 'numeric', min: 1, step: 1, unit: '' }}
      />
      <Input
        {...register('duration', {
          min: { value: 1, message: 'min value is 1 ' },
          required: { value: true, message: 'duration is required' },
        })}
        label="Duration"
        errorMsg={errors.duration?.message}
        type={{ type: 'numeric', min: 1, step: 1, unit: 'Day' }}
      />
      <Input
        {...register('comment', {})}
        label="Comment"
        errorMsg={errors.comment?.message}
        type={'text'}
        fillContainer
      />
    </ModalContainer>
  );
}
