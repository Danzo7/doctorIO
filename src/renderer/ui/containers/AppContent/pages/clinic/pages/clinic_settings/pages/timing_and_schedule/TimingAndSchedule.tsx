import { clinic } from '@api/fake';
import BorderSeparator from '@components/border_separator';
import CheckboxTile from '@components/checkbox_tile';
import Header from '@components/header';
import MultipleCheckGroup from '@components/inputs/multiple_check_group';
import SmallClinicStatus from '@components/small_clinic_status';
import PeriodTimePicker from '@components/time_picker';
import { rules } from '@constants/permissions';
import './style/index.scss';

interface TimingAndScheduleProps {}
export default function TimingAndSchedule({}: TimingAndScheduleProps) {
  return (
    <div className="timing-and-schedule">
      <SmallClinicStatus />
      <BorderSeparator direction="vertical" />
      <div className="timing-container">
        <Header title="Timing" />
        <PeriodTimePicker
          title="Opening time"
          startTime={clinic.timing.timeToOpen}
          endTime={clinic.timing.timeToClose}
          onChange={(data) => console.log(data)} //todo:update settings
        />
        <PeriodTimePicker
          title="Break"
          startTime="10:04"
          endTime="14:15"
          onChange={(data) => console.log(data)} //todo:update settings
        />
        <span>Working days</span>
        <MultipleCheckGroup
          items={[
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
          ]}
          value={clinic.timing.workingDays}
        />
        <BorderSeparator direction="horizontal" />
        <div className="rules-container">
          <span>Rules</span>
          {rules.map(({ name, description, permKey }) => (
            <CheckboxTile
              key={permKey}
              primaryText={name}
              secondaryText={description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
