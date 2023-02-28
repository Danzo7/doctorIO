import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PasswordInput from './PasswordInput';
export default {
  title: 'PasswordInput',
  component: PasswordInput,
};
const Template: Story<ComponentProps<typeof PasswordInput>> = (args) => (
  <PasswordInput {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
