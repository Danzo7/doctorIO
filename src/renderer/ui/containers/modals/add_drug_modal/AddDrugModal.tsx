import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ModalContainer from '@components/modal_container';
import { Overlay } from '@libs/overlay';
import { Drug } from '@models/instance.model';
import { addDrug, updatePrescription } from '@redux/local/session/sessionSlice';
import { useAppDispatch, useAppSelector } from '@store';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AddDrugModalProps {
  defaultValues?: Drug;
}
export default function AddDrugModal({ defaultValues }: AddDrugModalProps) {
  const prescription = useAppSelector((state) => state.session.prescription);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Drug>({
    defaultValues: {
      description: defaultValues?.description,
      dosage: defaultValues?.dosage,
      duration: defaultValues?.duration,
      name: defaultValues?.name,
      qts: defaultValues?.qts,
    },
  });
  const onSubmit: SubmitHandler<Drug> = (formData: Omit<Drug, 'id'>) => {
    if (!defaultValues) {
      const parsedData = {
        id: Date.now(),
        ...formData,
      };
      dispatch(addDrug(parsedData));
    } else {
      dispatch(
        updatePrescription({
          index: prescription.findIndex(({ id }) => id == defaultValues.id),
          drug: { id: defaultValues.id, ...formData },
        }),
      );
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
        {...register('name', {
          required: { value: true, message: 'Drug name is required' },
        })}
        label="Drug name"
        errorMsg={errors.name?.message}
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
        {...register('dosage', {
          min: { value: 1, message: 'min value is 1 ' },
          required: { value: true, message: 'dose is required' },
        })}
        label="dose"
        errorMsg={errors.dosage?.message}
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
        {...register('description', {})}
        label="description"
        errorMsg={errors.description?.message}
        type={'text'}
        fillContainer
      />
    </ModalContainer>
  );
}
