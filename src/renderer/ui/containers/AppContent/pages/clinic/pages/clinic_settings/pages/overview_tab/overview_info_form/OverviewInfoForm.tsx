import Input from '@components/inputs/input';
import './style/index.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import usePrompt from '@libs/HistoryBlocker';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import { Inputix } from '@components/inputs/input/Input';
import { useUpdateClinicOverviewMutation } from '@redux/clinic/clinicApi';
import { Clinic } from '@models/server.models';

type Inputs = {
  name: string;
  description: string;
  address: string;
  phone: string;
};

export default function OverviewInfoForm(defaults: Clinic) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Inputs>({
    defaultValues: {
      name: defaults?.name,
      description: defaults?.description ?? '',
      address: defaults?.address,
      phone: defaults?.phone ?? '',
    },
    mode: 'onChange',
  });

  const [updateClinicOverview] = useUpdateClinicOverviewMutation();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    updateClinicOverview({
      name: formData.name,
      description: formData.description,
      address: formData.address,
      phone: formData.phone,
    });

    reset(formData);
  };
  usePrompt(
    'Careful : you have unsaved changes !',
    () => (
      <SnakeBarActionsControls>
        <TextButton
          text="reset"
          afterBgColor={color.darker}
          onPress={() => {
            reset();
          }}
        />
        <TextButton
          text="Save changes"
          backgroundColor={color.good_green}
          onPress={async () => {
            await handleSubmit(onSubmit)();
          }}
        />
      </SnakeBarActionsControls>
    ),
    isDirty,
    isDirty,
  );
  return (
    <form className="overview-info-form">
      <Inputix control={control}>
        <span>Information</span>
        <Input label="Name" type={'text'} name={'name'} />
        <Input label="Description" type={'text'} name={'description'} />
        <Input label="Location" type={'text'} name={'address'} />
        <Input label="Phone number" type={'text'} name={'phone'} />
      </Inputix>
    </form>
  );
}
