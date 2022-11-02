import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CheckGroupItem from './CheckGroupItem';
export default {
  title: 'CheckGroupItem',
  component: CheckGroupItem,
};
const Template: Story<ComponentProps<typeof CheckGroupItem>> = (args) => (
  <CheckGroupItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = { label: 'Friday' };
