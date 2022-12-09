import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MultipleCheckGroup from './MultipleCheckGroup';
export default {
  title: 'Inputs/MultipleCheckGroup',
  component: MultipleCheckGroup,
};
const Template: Story<ComponentProps<typeof MultipleCheckGroup>> = (args) => (
  <MultipleCheckGroup {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
