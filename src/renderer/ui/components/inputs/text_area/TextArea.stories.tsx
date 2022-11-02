import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TextArea from './TextArea';
export default {
  title: 'inputs/TextArea',
  component: TextArea,
};
const Template: Story<ComponentProps<typeof TextArea>> = (args) => (
  <TextArea {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
