import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MessagesSideBar from './MessagesSideBar';
export default {
  title: 'MessagesSideBar',
  component: MessagesSideBar,
};
const Template: Story<ComponentProps<typeof MessagesSideBar>> = (args) => (
  <MessagesSideBar {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
