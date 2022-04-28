import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import QueueList from './QueueList';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'queue/QueueList',
  component: QueueList,
};
const Template: Story<ComponentProps<typeof QueueList>> = (args) => (
  <QueueList {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
