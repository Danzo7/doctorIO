import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import BookedItem from './BookedItem';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'BookedItem',
  component: BookedItem,
  argTypes: {
    state: { type: 'select', options: ['in queue', 'panding'] },
  },
};
const Template: Story<ComponentProps<typeof BookedItem>> = (args) => (
  <BookedItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  name: 'John Doe',
  bookTime: 'booked  20 days ago',
  state: 'panding',
};
