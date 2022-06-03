import color from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import CheckboxTile from '@components/checkbox_tile';
import Header from '@components/header';
import MultipleCheckGroup from '@components/inputs/multiple_check_group';
import SmallClinicStatus from '@components/small_clinic_status';
import PeriodTimePicker from '@components/time_picker';
import './style/index.scss';

interface TimingAndScheduleProps {}
export default function TimingAndSchedule({}: TimingAndScheduleProps) {
  return (
    <div className="timing-and-schedule">
      <SmallClinicStatus />
      <BorderSeparator direction="vertical" />
      <div className="timing-container">
        <Header title="Timing" />
        <PeriodTimePicker timePickerTitle="Opening time" />
        <PeriodTimePicker timePickerTitle="Break" />
        <span>Working days</span>
        <MultipleCheckGroup
          items={[
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Tuesday',
            'Friday',
          ]}
        />
        <BorderSeparator direction="horizontal" />
        <div className="rules-container">
          <span>Rules</span>
          <CheckboxTile
            primaryText="Allow custom breaks"
            secondaryText="This is an example permission"
            editable={true}
          />
          <CheckboxTile
            primaryText="Allow queue pausing"
            secondaryText="This is an example permission"
            editable={true}
          />
          <CheckboxTile
            primaryText="Allow bypass closing time"
            secondaryText="This is an example permission"
            editable={true}
          />
        </div>
      </div>
    </div>
  );
}
