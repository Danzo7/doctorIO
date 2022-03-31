import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import QueueItemWide from './QueueItemWide';
//👇 This default export determines where your story goes in the story list

export default {
  title: 'QueueItemWide',
  component: QueueItemWide,
};
const Template: Story<ComponentProps<typeof QueueItemWide>> = (args) => (
  <QueueItemWide {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = { value: '10', text: '11' };
