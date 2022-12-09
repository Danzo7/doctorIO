import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ProfileTab from './ProfileTab';
export default {
  title: 'SettingTabs/ProfileTab',
  component: ProfileTab,
};
const Template: Story<ComponentProps<typeof ProfileTab>> = (args) => (
  <ProfileTab {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
