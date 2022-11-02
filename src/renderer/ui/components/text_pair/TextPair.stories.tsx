import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TextPair from './TextPair';
export default {
  title: 'TextPair',
  component: TextPair,
};
const Template: Story<ComponentProps<typeof TextPair>> = (args) => (
  <TextPair {...args} />
);
export const FirstStory = Template;
FirstStory.args = { first: 'hello', second: 'World' };
