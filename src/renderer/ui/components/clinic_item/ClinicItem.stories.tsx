import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ClinicItem from './ClinicItem';
export default {
  title: 'ClinicItem',
  component: ClinicItem,
};
const Template: Story<ComponentProps<typeof ClinicItem>> = (args) => (
  <ClinicItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  selected: false,
  timeToClose: '12:00PM',
  numOfAssistants: 20,
  numOfPatients: 28,
};
