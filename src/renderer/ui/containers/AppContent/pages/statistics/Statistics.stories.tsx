import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Statistics from './Statistics';
export default {
  title: 'Statistics',
  component: Statistics,
};
const Template: Story<ComponentProps<typeof Statistics>> = (args) => (
  <Statistics {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
