import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NumberInput from './NumberInput';
export default {
  title: 'inputs/NumberInput',
  component: NumberInput,
};
const Template: Story<ComponentProps<typeof NumberInput>> = (args) => (
  <NumberInput {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
