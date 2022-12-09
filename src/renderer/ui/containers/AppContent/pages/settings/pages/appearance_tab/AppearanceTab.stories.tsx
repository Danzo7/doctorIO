import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppearanceTab from './AppearanceTab';
export default {
  title: 'SettingTabs/AppearanceTab',
  component: AppearanceTab,
};
const Template: Story<ComponentProps<typeof AppearanceTab>> = (args) => (
  <AppearanceTab {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
