import BorderSeparator from '@components/border_separator';
import CheckboxTile from '@components/checkbox_tile';
import Header from '@components/header';
import Input from '@components/inputs/input';
import SmallClinicStatus from '@components/small_clinic_status';
import PeriodTimePicker, { PeriodTimeInputs } from '@components/time_picker';
import { rules } from '@constants/permissions';
import { useOverViewInfo } from '@stores/overViewinfoStore';
import { useForm } from 'react-hook-form';
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
    workingDays: DayAliased[];
  }
  //REDUX add API
  const clinicInfo = useOverViewInfo();
  const { control, getValues, setValue } = useForm<Values>({
    defaultValues: {
      openingTime: {
        startTime: clinicInfo.timing.timeToOpen,
        endTime: clinicInfo.timing.timeToClose,
      },
      break: {
        startTime: clinicInfo.timing.breakStart,
        endTime: clinicInfo.timing.breakEnd,
      },
      workingDays: clinicInfo.timing.workingDays,
    },
  });
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

  return (
    <div className="timing-and-schedule">
      <SmallClinicStatus />
      <div className="timing-container">
        <Header title="Timing" />
        <PeriodTimePicker
          title="Opening time"
          values={getValues('openingTime')}
          onChange={(data) => {
            setValue('openingTime', data);
          }}
        />
        <PeriodTimePicker
          title="Break"
          values={getValues('break')}
          onChange={(data) => {
            setValue('break', data);
            // dispatch(
            //   updateTimingAndSchedule({
            //     timeToOpen: watch('openingTime.startTime'),
            //     timeToClose: watch('openingTime.endTime'),
            //     breakStart: watch('break.startTime'),
            //     breakEnd: watch('break.endTime'),
            //   }),
            // );
          }}
        />
        <span>Working days</span>
        <Input
          type={{
            type: 'multiCheck',
            options: days,
          }}
          control={control}
          name="workingDays"
        />
        <BorderSeparator direction="horizontal" />
        <div className="rules-container">
          <span>Rules</span>
          {rules.map(({ name, description, permKey }) => (
            <CheckboxTile
              key={permKey}
              primaryText={name}
              secondaryText={description}
              isChecked={clinicInfo.timing.rules.includes(permKey)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
