import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PeriodTimePicker from './PeriodTimePicker';
export default {
  title: 'PeriodTimePicker',
  component: PeriodTimePicker,
};
const Template: Story<ComponentProps<typeof PeriodTimePicker>> = (args) => (
  <PeriodTimePicker {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  title: 'Opening time',
};
