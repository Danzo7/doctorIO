import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Settings from './Settings';
export default {
  title: 'Settings',
  component: Settings,
};
const Template: Story<ComponentProps<typeof Settings>> = (args) => (
  <Settings {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
