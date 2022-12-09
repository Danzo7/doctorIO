import Input from '@components/inputs/input';
import SettingOption from '@components/setting_option';
import { useForm } from 'react-hook-form';
import Theme01 from 'toSvg/theme01.svg?icon';
import Theme02 from 'toSvg/theme02.svg?icon';
import './style/index.scss';

interface Inputs {
  theme: 'Nighty (default)' | 'Coming soon...';
}
interface AppearanceTabProps {}
export default function AppearanceTab({}: AppearanceTabProps) {
  const { control } = useForm<Inputs>({
    defaultValues: {
      theme: 'Nighty (default)',
    },
  });
  return (
    <div className="appearance-tab">
      <SettingOption
        title="Theme preferences"
        description="Choose how clinicord looks to you."
        controls={
          <Input
            control={control}
            name="theme"
            background="none"
            height="fit-content"
            type={{
              type: 'multiCheck',
              onlyOne: true, //FIXME  fix problem when clicking on the selected choice again

              groupItemType: {
                name: 'ThemePreferenceItem',
                options: [
                  { label: 'Nighty (default)', preview: Theme01 },
                  { label: 'Coming soon...', preview: Theme02 },
                ],
              },
            }}
          />
        }
      />
    </div>
  );
}
