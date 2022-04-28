import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Dropdown from './Dropdown';
export default {
  title: 'Dropdown',
  component: Dropdown,
};
const Template: Story<ComponentProps<typeof Dropdown>> = (args) => (
  <Dropdown {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
