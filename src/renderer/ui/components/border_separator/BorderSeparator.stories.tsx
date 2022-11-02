import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import BorderSeparator from './BorderSeparator';
export default {
  title: 'BorderSeparator',
  component: BorderSeparator,
};
const Template: Story<ComponentProps<typeof BorderSeparator>> = (args) => (
  <BorderSeparator {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
