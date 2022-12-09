import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SecurityTab from './SecurityTab';
export default {
  title: 'SettingTabs/SecurityTab',
  component: SecurityTab,
};
const Template: Story<ComponentProps<typeof SecurityTab>> = (args) => (
  <SecurityTab {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
