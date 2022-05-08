import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';

import Chat from './Chat';
export default {
  title: 'Chat',
  component: Chat,
};
const Template: Story<ComponentProps<typeof Chat>> = (args) => (
  <Chat {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  memberFullName: 'Dr therapist',
  status: false,
  sepPos: 1,
};
