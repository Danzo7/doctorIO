import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import InputContainer from './InputContainer';
export default {
  title: 'inputs/InputContainer',
  component: InputContainer,
};
const Template: Story<ComponentProps<typeof InputContainer>> = (args) => (
  <InputContainer {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
