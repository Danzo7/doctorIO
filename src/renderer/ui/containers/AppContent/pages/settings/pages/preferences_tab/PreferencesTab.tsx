import color from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import CheckboxTile from '@components/checkbox_tile';
import Input from '@components/inputs/input';
import SettingOption from '@components/setting_option';
import { DATE_DAY, DATE_ONLY } from '@constants/data_format';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import './style/index.scss';

//TODO add time and day options
interface Inputs {
  language: string;
  date: string;
  time: string;
  day: string;
}
interface PreferencesTabProps {}
export default function PreferencesTab({}: PreferencesTabProps) {
  const { control } = useForm<Inputs>({});
  return (
    <div className="preferences-tab">
      <SettingOption
        title="date & time format"
        description="Choose how the date and time is formatted."
        controls={
          <div className="date-format-inputs">
            <Input
              control={control}
              label="Date"
              name="date"
              placeholder="Date"
              type={{
                type: 'select',
                options: [
                  format(new Date(), DATE_ONLY),
                  format(new Date(), 'MM/dd/yyyy'),
                  format(new Date(), 'yyyy/mm/dd'),
                ],
              }}
            />
            <Input
              control={control}
              label="Day"
              name="day"
              type={{
                type: 'select',
                options: [
                  format(new Date(), DATE_DAY),
                  format(new Date(), 'EEEE dd MMM'),
                ],
              }}
            />
            <Input
              control={control}
              label="Time"
              name="time"
              type={{ type: 'select', options: ['24h', '12h'] }}
            />
          </div>
        }
      />
      <BorderSeparator direction="horizontal" color={color.silver_gray} />
      <SettingOption
        title="Display language"
        description="Choose a display language."
        controls={
          <Input
            control={control}
            background="none"
            name="language"
            type={{
              type: 'multiCheck',
              onlyOne: true,
              mustOne: true,
              selected: [0],
              options: ['English', 'Francais', 'العربية'],
            }}
          />
        }
      />
      <BorderSeparator direction="horizontal" color={color.silver_gray} />
      <CheckboxTile
        primaryText="Start with windows"
        secondaryText="Auto start when system boot."
      />
    </div>
  );
}
