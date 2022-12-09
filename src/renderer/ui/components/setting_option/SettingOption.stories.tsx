import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SettingOption from './SettingOption';
import TextButton from '@components/buttons/text_button';
import color from '@assets/styles/color';
export default {
  title: 'SettingOption',
  component: SettingOption,
};
const Template: Story<ComponentProps<typeof SettingOption>> = (args) => (
  <SettingOption {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  title: 'Secret key',
  description: 'The default secret key is provided by the current clinic only.',
  controls: (
    <TextButton
      text="Change dependent..."
      fontColor={color.cold_red}
      fontSize={9}
      fontWeight={700}
      backgroundColor={color.darkersec_color}
      radius={7}
      borderColor={color.border_color}
      afterBgColor={color.darkersec_color}
      afterFontColor={color.cold_red}
    />
  ),
};
