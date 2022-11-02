import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddSearchToBooked from './AddSearchToBooked';
export default {
  title: 'Modals/AddSearchToBooked',
  component: AddSearchToBooked,
};
const Template: Story<ComponentProps<typeof AddSearchToBooked>> = (args) => (
  <AddSearchToBooked {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
