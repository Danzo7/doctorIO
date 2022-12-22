import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SmallUserStatus from './SmallUserStatus';
export default {
  title: 'SmallUserStatus',
  component: SmallUserStatus,
};
const Template: Story<ComponentProps<typeof SmallUserStatus>> = (args) => (
  <SmallUserStatus {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
