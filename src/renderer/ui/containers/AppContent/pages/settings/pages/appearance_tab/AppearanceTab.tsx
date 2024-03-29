import { color } from '@assets/styles/color';
import Radio from '@components/inputs/radio';
import SettingOption from '@components/setting_option';
import ThemePreferenceItem from '@components/theme_preference_item';
import { SETTINGS, useAppSettingsStore } from '@stores/appSettingsStore';
import Theme01 from 'toSvg/theme01.svg?icon';
import drakula from 'toSvg/drakula.svg?icon';

import Theme02 from 'toSvg/theme02.svg?icon';
import './style/index.scss';

interface AppearanceTabProps {}
export default function AppearanceTab({}: AppearanceTabProps) {
  //TODO link store
  return (
    <SettingOption
      title="Theme preferences"
      description="Choose how clinicord looks to you."
      controls={
        <div className="appearance-tab">
          <ThemePreferenceItem
            Preview={Theme01}
            negaBackground={color.good_black} //an opposite color of background to make the preview more visible
            input={
              <Radio
                isChecked={SETTINGS.theme === 'Nighty'}
                label="Nighty (default)"
                group="theme"
                onChanged={() =>
                  useAppSettingsStore.getState().setTheme('Nighty')
                }
              />
            }
          />
          <ThemePreferenceItem
            Preview={drakula}
            negaBackground={color.background}
            input={
              <Radio
                isChecked={SETTINGS.theme === 'drakula'}
                label="Drakula"
                group="theme"
                onChanged={() =>
                  useAppSettingsStore.getState().setTheme('drakula')
                }
              />
            }
          />
          <ThemePreferenceItem
            Preview={Theme02}
            negaBackground={color.background}
            input={<Radio disabled label="Coming soon..." group="theme" />}
          />
        </div>
      }
    />
  );
}
