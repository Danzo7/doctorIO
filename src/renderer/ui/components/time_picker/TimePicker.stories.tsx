import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TimePicker from './TimePicker';
export default {
  title: 'TimePicker',
  component: TimePicker,
};
const Template: Story<ComponentProps<typeof TimePicker>> = (args) => (
  <TimePicker {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  timePickerTitle: 'Opening time',
};
