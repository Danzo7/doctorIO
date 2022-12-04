import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DateSpan from './DateSpan';
export default {
  title: 'DateSpan',
  component: DateSpan,
};
const Template: Story<ComponentProps<typeof DateSpan>> = (args) => (
  <DateSpan {...args} />
);
export const FirstStory = Template;
FirstStory.args = { value: '28 Feb 2021' };
