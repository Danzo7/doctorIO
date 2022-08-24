import color from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextButton from '@components/buttons/text_button';
import CheckboxTile from '@components/checkbox_tile';
import Header from '@components/header';
import MultipleCheckGroup from '@components/inputs/multiple_check_group';
import SmallClinicStatus from '@components/small_clinic_status';
import PeriodTimePicker, { PeriodTimeInputs } from '@components/time_picker';
import { rules } from '@constants/permissions';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import usePrompt from '@libs/HistoryBlocker';
import { updateTimingAndSchedule } from '@redux/local/settings/settingsSlice';
import store, { useAppDispatch, useAppSelector } from '@store';
import { SubmitHandler, useForm } from 'react-hook-form';
import './style/index.scss';

interface TimingAndScheduleProps {}
export default function TimingAndSchedule({}: TimingAndScheduleProps) {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  interface Values {
    openingTime: PeriodTimeInputs;
    break: PeriodTimeInputs;
  }
  // const clinicInfo = useAppSelector((state) => state.settings);
  const clinicInfo = store.getState().settings;
  console.log('clinicInfo', clinicInfo.timing.timeToClose);
  const { control, getValues, setValue, watch } = useForm<Values>({
    defaultValues: {
      openingTime: {
        startTime: clinicInfo.timing.timeToOpen,
        endTime: clinicInfo.timing.timeToClose,
      },
      break: {
        startTime: clinicInfo.timing.breakStart,
        endTime: clinicInfo.timing.breakEnd,
      },
    },
  });
  const dispatch = useAppDispatch();
  /* usePrompt(
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
  );  */
  dispatch(
    updateTimingAndSchedule({
      timeToOpen: watch('openingTime.startTime'),
      timeToClose: watch('openingTime.endTime'),
      breakStart: watch('break.startTime'),
      breakEnd: watch('break.endTime'),
    }),
  );
  watch();
  return (
    <div className="timing-and-schedule">
      <SmallClinicStatus />
      <BorderSeparator direction="vertical" />
      <div className="timing-container">
        <Header title="Timing" />
        <PeriodTimePicker
          title="Opening time"
          values={getValues('openingTime')}
          onChange={(data) => setValue('openingTime', data)}
        />
        <PeriodTimePicker
          title="Break"
          values={getValues('break')}
          onChange={(data) => setValue('openingTime', data)}
        />
        <span>Working days</span>
        <MultipleCheckGroup
          items={days}
          value={clinicInfo.timing.workingDays}
        />
        <BorderSeparator direction="horizontal" />
        <div className="rules-container">
          <span>Rules</span>
          {rules.map(({ name, description, permKey }) => (
            <CheckboxTile
              key={permKey}
              primaryText={name}
              secondaryText={description}
              isChecked={clinicInfo.timing[permKey]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
