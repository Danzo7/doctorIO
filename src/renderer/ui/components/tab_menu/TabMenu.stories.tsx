import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TabMenu from './TabMenu';
export default {
  title: 'TabMenu',
  component: TabMenu,
};
const Template: Story<ComponentProps<typeof TabMenu>> = (args) => (
  <TabMenu {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  items: [
    'Overview',
    'Members',
    'Roles',
    'Timing and Schedule',
    'Preferences',
    'Audit log',
    'Security settings',
  ],
};
