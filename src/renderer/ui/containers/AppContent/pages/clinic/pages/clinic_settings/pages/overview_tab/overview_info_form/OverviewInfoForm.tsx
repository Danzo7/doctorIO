import Input from '@components/inputs/input';
import './style/index.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import usePrompt from '@libs/HistoryBlocker';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import { Inputix } from '@components/inputs/input/Input';
import { useUpdateClinicOverviewMutation } from '@redux/clinic/clinicApi';
import {
  useOverViewInfo,
  useSetDefaults,
  useSetOverViewInfo,
} from '@stores/overViewinfoStore';

type Inputs = {
  name: string;
  description: string;
  address: string;
  phone: string;
};

interface OverviewInfoFormProps {}
export default function OverviewInfoForm(props: OverviewInfoFormProps) {
  const setOverviewInfor = useSetOverViewInfo();
  const setDefaults = useSetDefaults();
  const info = useOverViewInfo();

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Inputs>({
    defaultValues: {
      name: info.defaults?.name,
      description: info.defaults?.description ?? '',
      address: info.defaults?.address ?? '',
      phone: info.defaults?.phone ?? '',
    },
    mode: 'onChange',
  });

  // dispatch(setOverviewInfo(watch()));
  const [UpdateClinicOverview] = useUpdateClinicOverviewMutation();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    UpdateClinicOverview({
      //FIXME the req goes and respond with true but it never update clinic values on the server
      name: formData.name,
      description: formData.description,
      address: formData.address,
      phone: formData.phone,
    }).then((res) => console.log('res : ', res));
    setDefaults({
      name: formData.name,
      description: formData.description,
      address: formData.address,
      phone: formData.phone,
    });
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
          onPress={async () => {
            await handleSubmit(onSubmit)();
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
        <Input
          label="Name"
          type={'text'}
          name={'name'}
          onChange={(e) =>
            setOverviewInfor({
              name: e,
            })
          }
        />
        <Input
          label="Description"
          type={'text'}
          name={'description'}
          onChange={(e) =>
            setOverviewInfor({
              description: e,
            })
          }
        />
        <Input
          label="Location"
          type={'text'}
          name={'address'}
          onChange={(e) =>
            setOverviewInfor({
              address: e,
            })
          }
        />
        <Input
          label="Phone number"
          type={'text'}
          name={'phone'}
          onChange={(e) =>
            setOverviewInfor({
              phone: e,
            })
          }
        />
      </Inputix>
    </form>
  );
}
