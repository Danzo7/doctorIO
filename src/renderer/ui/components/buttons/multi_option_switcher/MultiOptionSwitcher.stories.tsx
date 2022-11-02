import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MultiOptionSwitcher from './MultiOptionSwitcher';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'buttons/MultiOptionSwitcher',
  component: MultiOptionSwitcher,
};
const Template: Story<ComponentProps<typeof MultiOptionSwitcher>> = (args) => (
  <MultiOptionSwitcher {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  textList: ['first', 'second', 'anotherOne'],
  growOnselection: false,
};
