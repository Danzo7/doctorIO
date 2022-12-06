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
export const FirstStory = Template;
FirstStory.args = {
  date: new Date('2022-08-19T18:14:15.472Z'),
  assignedBy: {
    memberId: 1,
    memberName: 'John Doe',
  },
  state: { phase: 'canceled', isBooked: false },
};
