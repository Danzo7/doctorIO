import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { InputControllerContext } from '@components/inputs/input/Input';
import ModalContainer from '@components/modal_container';
import { zodResolver } from '@hookform/resolvers/zod';
import { Overlay } from '@libs/overlay';
import { Drug } from '@models/instance.model';
import { addDrug, updatePrescription } from '@redux/local/session/sessionSlice';
import { useAppDispatch, useAppSelector } from '@store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface AddDrugModalProps {
  defaultValues?: Drug;
}
const schema = z.object({
  name: z.string().min(1, 'Drug name is required'),
  qts: z.number().gt(0, 'qts is required'),
  dosage: z.number().gt(0, 'dosage is required'),
  duration: z.number().gt(0, 'duration is required'),
  description: z.optional(z.string()),
});

export default function AddDrugModal({ defaultValues }: AddDrugModalProps) {
  const prescription = useAppSelector(
    (state) => state.session.sessionInfo.prescription,
  );
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Drug, 'id'>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: defaultValues?.description ?? '',
      dosage: defaultValues?.dosage ?? 0,
      duration: defaultValues?.duration ?? 0,
      name: defaultValues?.name ?? '',
      qts: defaultValues?.qts ?? 0,
    },
  });
  const onSubmit: SubmitHandler<Omit<Drug, 'id'>> = (
    formData: Omit<Drug, 'id'>,
  ) => {
    if (!defaultValues) {
      dispatch(addDrug(formData));
    } else {
      dispatch(
        updatePrescription({
          index: prescription.findIndex(({ id }) => id == defaultValues.id),
          drug: formData,
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
      {' '}
      <InputControllerContext.Provider value={control}>
        <Input
          name="name"
          label="Drug name"
          errorMessage={errors.name?.message}
          type={'text'}
          fillContainer
        />
        <Input
          name="qts"
          label="Qts"
          errorMessage={errors.qts?.message}
          type={{ type: 'numeric', step: 1, unit: '' }}
        />
        <Input
          name="dosage"
          label="dose"
          errorMessage={errors.dosage?.message}
          type={{ type: 'numeric', step: 1, unit: '' }}
        />
        <Input
          name="duration"
          label="Duration"
          errorMessage={errors.duration?.message}
          type={{ type: 'numeric', step: 1, unit: 'Day' }}
        />
        <Input
          name="description"
          label="description"
          errorMessage={errors.description?.message}
          type={'text'}
          fillContainer
        />
      </InputControllerContext.Provider>
    </ModalContainer>
  );
}
