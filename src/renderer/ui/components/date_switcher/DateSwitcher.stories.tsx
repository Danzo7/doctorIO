import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DateSwitcher from './DateSwitcher';
export default {
  title: 'DateSwitcher',
  component: DateSwitcher,
};
const Template: Story<ComponentProps<typeof DateSwitcher>> = (args) => (
  <DateSwitcher {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
