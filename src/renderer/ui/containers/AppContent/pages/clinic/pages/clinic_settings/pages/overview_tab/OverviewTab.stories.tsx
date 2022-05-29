import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import OverviewTab from './OverviewTab';
export default {
  title: 'OverviewTab/OverviewTab',
  component: OverviewTab,
};
const Template: Story<ComponentProps<typeof OverviewTab>> = (args) => (
  <OverviewTab {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
