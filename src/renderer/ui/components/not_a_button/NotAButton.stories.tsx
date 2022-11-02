import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NotAButton from './NotAButton';
export default {
  title: 'NotAButton',
  component: NotAButton,
};
const Template: Story<ComponentProps<typeof NotAButton>> = (args) => (
  <NotAButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
