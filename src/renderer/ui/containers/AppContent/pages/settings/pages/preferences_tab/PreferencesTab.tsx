import color from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import CheckboxTile from '@components/checkbox_tile';
import Input from '@components/inputs/input';
import SettingOption from '@components/setting_option';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import './style/index.scss';

const schema = z.object({
  language: z.enum(['English', 'Francais', 'العربية']),
  date: z.enum(['dd MMM yyyy', 'EEEE, dd MMM', 'dd MMM yyyy, h:mm aa']),
});
//TODO add time and day options
interface Inputs {
  language: 'English' | 'Francais' | 'العربية';
  date: 'dd MMM yyyy' | 'EEEE, dd MMM' | 'dd MMM yyyy, h:mm aa';
  time: string;
  day: string;
}
interface PreferencesTabProps {}
export default function PreferencesTab({}: PreferencesTabProps) {
  const { control } = useForm<Inputs>({
    defaultValues: {
      language: 'English',
      date: 'dd MMM yyyy',
    },
    resolver: zodResolver(schema),
  });
  const [autoStart, setAutoStart] = useState(false);
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
                  'dd MMM yyyy',
                  'EEEE, dd MMM',
                  'dd MMM yyyy, h:mm aa',
                ],
              }}
            />
            <Input
              control={control}
              label="Time"
              name="time"
              placeholder="Time"
              type={{ type: 'select', options: [] }}
            />
            <Input
              control={control}
              label="Day"
              name="day"
              placeholder="Day"
              type={{ type: 'select', options: [] }}
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

              groupItemType: {
                name: 'TextButton',
                options: ['English', 'Francais', 'العربية'],
              },
            }}
          />
        }
      />
      <BorderSeparator direction="horizontal" color={color.silver_gray} />
      <CheckboxTile
        primaryText="Start with windows"
        secondaryText="Auto start when system boot."
        isChecked={autoStart}
        onChange={setAutoStart}
      />
    </div>
  );
}
