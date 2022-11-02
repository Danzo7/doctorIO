import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Checkbox from './Checkbox';
export default {
  title: 'inputs/Checkbox',
  component: Checkbox,
};
const Template: Story<ComponentProps<typeof Checkbox>> = (args) => (
  <Checkbox {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
