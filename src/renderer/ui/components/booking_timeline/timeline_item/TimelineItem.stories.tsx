import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TimelineItem from './TimelineItem';
export default {
  title: 'TimelineItem',
  component: TimelineItem,
};
const Template: Story<ComponentProps<typeof TimelineItem>> = (args) => (
  <TimelineItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  date: new Date('2022-01-01'),
  assistantName: 'carl joghn',
  doctorName: 'carl joghn',
  type: {
    subject: 'Inner bleed',
  },
};
