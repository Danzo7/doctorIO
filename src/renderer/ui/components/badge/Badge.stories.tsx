import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Badge from './Badge';
export default {
  title: 'Badge',
  component: Badge,
};
const Template: Story<ComponentProps<typeof Badge>> = (args) => (
  <Badge {...args} />
);
export const FirstStory = Template;
FirstStory.args = { text: 'test', color: '#ff0000' };
