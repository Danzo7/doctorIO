import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import InputField from './InputField';
export default {
  title: 'Inputs/InputField',
  component: InputField,
};
const Template: Story<ComponentProps<typeof InputField>> = (args) => (
  <InputField {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  label: 'hello',
  searchIcon: true,
  placeholder: 'search for a patients',
};
