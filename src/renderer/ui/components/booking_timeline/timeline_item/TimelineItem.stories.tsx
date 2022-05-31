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
  type: {
    date: '',
    assistant: 'John',
    doctor: 'John Doe',
    subject: 'Inner bleed',
  },
};
