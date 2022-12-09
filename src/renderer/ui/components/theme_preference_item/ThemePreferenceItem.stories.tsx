import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ThemePreferenceItem from './ThemePreferenceItem';
import Theme01 from 'toSvg/theme01.svg?icon';
export default {
  title: 'ThemePreferenceItem',
  component: ThemePreferenceItem,
};
const Template: Story<ComponentProps<typeof ThemePreferenceItem>> = (args) => (
  <ThemePreferenceItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = { label: 'Nighty (default)', Preview: Theme01 };
