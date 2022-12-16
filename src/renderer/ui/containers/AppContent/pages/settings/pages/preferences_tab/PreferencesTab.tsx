import color from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextButton from '@components/buttons/text_button';
import CheckboxTile from '@components/checkbox_tile';
import Input from '@components/inputs/input';
import SettingOption from '@components/setting_option';
import {
  DATE_FORMAT,
  DAY_FORMAT,
  LANG,
  TIME_FORMAT,
} from '@constants/app_settings';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import usePrompt from '@libs/HistoryBlocker';
import { AppSettings } from '@models/local.models';
import { SETTINGS, useAppSettingsStore } from '@stores/appSettingsStore';

import { useForm } from 'react-hook-form';
import './style/index.scss';
interface PreferencesTabProps {}
export default function PreferencesTab({}: PreferencesTabProps) {
  const {
    control,
    getValues,
    formState: { isDirty },
    reset,
  } = useForm<
    Pick<AppSettings, 'dateFormat' | 'dayFormat' | 'language' | 'timeFormat'>
  >({
    defaultValues: {
      dateFormat: SETTINGS.dateFormat,
      dayFormat: SETTINGS.dayFormat,
      language: SETTINGS.language,
      timeFormat: SETTINGS.timeFormat,
    },
  });
  usePrompt(
    'Careful : you have unsaved changes !',
    () => (
      <SnakeBarActionsControls>
        <TextButton
          text="reset"
          afterBgColor={color.darker}
          onPress={() => {
            reset();
          }}
        />
        <TextButton
          text="Save changes"
          backgroundColor={color.good_green}
          onPress={async () => {
            useAppSettingsStore.getState().set(getValues());
            reset({
              dateFormat: SETTINGS.dateFormat,
              dayFormat: SETTINGS.dayFormat,
              language: SETTINGS.language,
              timeFormat: SETTINGS.timeFormat,
            });
          }}
        />
      </SnakeBarActionsControls>
    ),
    isDirty,
    isDirty,
  );
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
              name="dateFormat"
              placeholder="Date"
              type={{
                type: 'select',
                options: [...DATE_FORMAT],
              }}
            />
            <Input
              control={control}
              label="Day"
              name="dayFormat"
              type={{
                type: 'select',
                options: [...DAY_FORMAT],
              }}
            />
            <Input
              control={control}
              label="Time"
              name="timeFormat"
              type={{
                type: 'select',
                options: [...TIME_FORMAT],
              }}
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
              options: [...LANG],
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
