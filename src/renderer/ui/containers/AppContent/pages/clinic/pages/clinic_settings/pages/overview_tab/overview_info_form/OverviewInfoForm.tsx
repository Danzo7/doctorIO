import Input from '@components/inputs/input';
import './style/index.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import usePrompt from '@libs/HistoryBlocker';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';

type Inputs = {
  name: string;
  description: string;
  location: string;
  phoneNumber: number;
};

interface OverviewInfoFormProps {}
export default function OverviewInfoForm({}: OverviewInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => console.log(formData);
  usePrompt(
    'Careful : you have unsaved changes !',
    ({ closeOVerlay, dismiss }) => (
      <SnakeBarActionsControls>
        <TextButton
          text="dismiss"
          afterBgColor={color.darker}
          onPress={() => {
            closeOVerlay();
            dismiss();
          }}
        />
        <TextButton
          text="Save changes"
          padding={'5px 10px'}
          backgroundColor={color.good_green}
          onPress={() => {
            closeOVerlay();
            dismiss();
          }}
        />
      </SnakeBarActionsControls>
    ),
    isDirty,
  );

  return (
    <div className="overview-info-form">
      <span>Informations</span>
      <Input {...register('name')} label="Name" type={'text'} />
      <Input {...register('description')} label="Description" type={'text'} />
      <Input {...register('location')} label="Location" type={'text'} />
      <Input
        {...register('phoneNumber')}
        label="Phone number"
        type={'number'}
      />
    </div>
  );
}
