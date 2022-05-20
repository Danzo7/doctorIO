import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Clinic from './Clinic';
export default {
  title: 'Clinic',
  component: Clinic,
};
const Template: Story<ComponentProps<typeof Clinic>> = (args) => (
  <Clinic {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
