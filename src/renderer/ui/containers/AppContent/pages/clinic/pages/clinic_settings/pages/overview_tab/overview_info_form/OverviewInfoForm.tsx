import Input from '@components/inputs/input';
import './style/index.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import usePrompt from '@libs/HistoryBlocker';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import { Inputix } from '@components/inputs/input/Input';
import { useAppDispatch } from '@store';
import { setOverviewInfo } from '@redux/local/settings/settingsSlice';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Inputs = {
  name: string;
  description: string;
  address: string;
  phone: string;
};
const schema = z.object({
  name: z.string().min(1, 'Clinic name is required'),
  clinicAddress: z.string().min(1, 'Clinic address is required'),
  description: z.optional(z.string()),
  phone: z.string().min(8),
});
interface OverviewInfoFormProps {}
export default function OverviewInfoForm(
  props: OverviewInfoFormProps & Inputs,
) {
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Inputs>({
    defaultValues: props,
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const dispatch = useAppDispatch();
  dispatch(setOverviewInfo(watch()));

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    //REDUX API SUBMIT
    reset(formData);
  };
  usePrompt(
    'Careful : you have unsaved changes !',
    ({ closeOverlay, dismiss }) => (
      <SnakeBarActionsControls>
        <TextButton
          text="reset"
          afterBgColor={color.darker}
          onPress={() => {
            closeOverlay();
            reset();
            dismiss();
          }}
        />
        <TextButton
          text="Save changes"
          backgroundColor={color.good_green}
          onPress={() => {
            handleSubmit(onSubmit)();
            closeOverlay();
            dismiss();
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
