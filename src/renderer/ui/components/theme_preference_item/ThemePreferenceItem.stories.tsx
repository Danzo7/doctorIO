import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ThemePreferenceItem from './ThemePreferenceItem';
import Theme01 from 'toSvg/theme01.svg?icon';
import Radio from '@components/inputs/radio';
import { color } from '@assets/styles/color';
export default {
  title: 'ThemePreferenceItem',
  component: ThemePreferenceItem,
};
const Template: Story<ComponentProps<typeof ThemePreferenceItem>> = (args) => (
  <ThemePreferenceItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  negaBackground: color.background,
  input: <Radio label="Coming soon..." group="theme" disabled />,
  Preview: Theme01,
};
