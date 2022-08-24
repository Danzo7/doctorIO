import BorderSeparator from '@components/border_separator';
import CheckboxTile from '@components/checkbox_tile';
import Header from '@components/header';
import MultipleCheckGroup from '@components/inputs/multiple_check_group';
import SmallClinicStatus from '@components/small_clinic_status';
import PeriodTimePicker from '@components/time_picker';
import { rules } from '@constants/permissions';
import { useAppSelector } from '@store';
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
  const clinicInfo = useAppSelector((state) => state.settings);
  return (
    <div className="timing-and-schedule">
      <SmallClinicStatus />
      <BorderSeparator direction="vertical" />
      <div className="timing-container">
        <Header title="Timing" />
        <PeriodTimePicker
          title="Opening time"
          startTime={clinicInfo.timing.timeToOpen}
          endTime={clinicInfo.timing.timeToClose}
          onChange={(data) => console.log(data)} //REDUX:update settings
        />
        <PeriodTimePicker
          title="Break"
          startTime="10:04"
          endTime="14:15"
          onChange={(data) => console.log(data)} //REDUX:update settings
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
