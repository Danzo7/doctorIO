import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ToastContainer from './ToastContainer';
export default {
  title: 'ToastContainer',
  component: ToastContainer,
};
const Template: Story<ComponentProps<typeof ToastContainer>> = (args) => (
  <ToastContainer {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
