import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddVitalFieldItem from './AddVitalFieldItem';
export default {
  title: 'AddVitalFieldItem',
  component: AddVitalFieldItem,
};
const Template: Story<ComponentProps<typeof AddVitalFieldItem>> = (args) => (
  <AddVitalFieldItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
