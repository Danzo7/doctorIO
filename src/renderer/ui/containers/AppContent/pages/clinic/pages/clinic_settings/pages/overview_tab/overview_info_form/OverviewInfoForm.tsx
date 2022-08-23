import Input from '@components/inputs/input';
import './style/index.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import usePrompt from '@libs/HistoryBlocker';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import { InputControllerContext } from '@components/inputs/input/Input';
import { useAppDispatch } from '@store';
import { setOverviewInfo } from '@redux/local/settings/overviewSlice';
import { useEffect, useRef, useState } from 'react';

type Inputs = {
  clinicName: string;
  description: string;
  clinicAddress: string;
  phoneNumber: string;
};

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
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    dispatch(setOverviewInfo(formData));
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
    true,
  );

  return (
    <form className="overview-info-form">
      <InputControllerContext.Provider value={control}>
        <span>Information</span>
        <Input label="Name" type={'text'} name={'clinicName'} />
        <Input label="Description" type={'text'} name={'description'} />
        <Input label="Location" type={'text'} name={'clinicAddress'} />
        <Input label="Phone number" type={'number'} name={'phoneNumber'} />
      </InputControllerContext.Provider>
    </form>
  );
}
