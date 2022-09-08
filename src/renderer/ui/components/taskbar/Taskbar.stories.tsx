import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Taskbar from './Taskbar';
export default {
  title: 'Taskbar',
  component: Taskbar,
};
const Template: Story<ComponentProps<typeof Taskbar>> = (args) => (
  <Taskbar {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
