import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ModalContainer from '@components/modal_container';
import { Overlay } from '@libs/overlay';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  drugName: string;
  duration: number;
  qts: number;
  comment: string;
};
interface AddDrugModalProps {
  onAdd: (data: any) => void;
  defaultValues?: Inputs;
}
export default function AddDrugModal({
  onAdd,
  defaultValues,
}: AddDrugModalProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    if (!defaultValues) {
      onAdd(formData);
    }

    Overlay.close();
  };

  useEffect(() => {
    if (defaultValues) {
      console.log('default', defaultValues);
      reset(defaultValues);
    }
    return () => {};
  }, []);

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
        {...register('duration', {
          min: { value: 1, message: 'min value is 1 ' },
          required: { value: true, message: 'duration is required' },
        })}
        label="Duration"
        errorMsg={errors.duration?.message}
        type={{ type: 'numeric', min: 1, step: 1, unit: 'Day' }}
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
        {...register('comment', {})}
        label="Comment"
        errorMsg={errors.comment?.message}
        type={'text'}
        fillContainer
      />
    </ModalContainer>
  );
}
