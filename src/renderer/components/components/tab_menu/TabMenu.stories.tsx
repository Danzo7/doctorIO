import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TabMenu from './TabMenu';
export default {
  title: 'TabMenu',
  component: TabMenu,
};
const Template: Story<ComponentProps<typeof TabMenu>> = (args) => (
  <TabMenu {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  textList: [
    'Overview',
    'Members',
    'Roles',
    'Timing and Schedule',
    'Preferences',
    'Audit log',
    'Security settings',
  ],
};
