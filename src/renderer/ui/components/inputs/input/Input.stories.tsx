import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Input from './Input';
export default {
  title: 'inputs/Input',
  component: Input,
};
const Template: Story<ComponentProps<typeof Input>> = (args) => (
  <Input {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
