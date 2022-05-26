import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Datepicker from './Datepicker';
export default {
  title: 'inputs/Datepicker',
  component: Datepicker,
};
const Template: Story<ComponentProps<typeof Datepicker>> = (args) => (
  <Datepicker {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
