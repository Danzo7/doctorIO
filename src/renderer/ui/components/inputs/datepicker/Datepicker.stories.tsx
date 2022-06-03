import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Datepicker from './Datepicker';
import Timepicker from './Timepicker';
export default {
  title: 'inputs/Datepicker',
  component: Datepicker,
};
const Template: Story<ComponentProps<typeof Datepicker>> = (args) => (
  <Datepicker {...args} />
);
const Template2: Story<ComponentProps<typeof Timepicker>> = (args) => (
  <Timepicker {...args} />
);
export const FirstStory = Template.bind({});
export const SecondStory = Template2.bind({});
FirstStory.args = {};
