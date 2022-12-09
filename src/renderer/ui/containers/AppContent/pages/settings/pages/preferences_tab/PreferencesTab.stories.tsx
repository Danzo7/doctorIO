import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PreferencesTab from './PreferencesTab';
export default {
  title: 'SettingTabs/PreferencesTab',
  component: PreferencesTab,
};
const Template: Story<ComponentProps<typeof PreferencesTab>> = (args) => (
  <PreferencesTab {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
