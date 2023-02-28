import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Radio from './Radio';
export default {
  title: 'Radio',
  component: Radio,
};
const Template: Story<ComponentProps<typeof Radio>> = (args) => (
  <Radio {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
