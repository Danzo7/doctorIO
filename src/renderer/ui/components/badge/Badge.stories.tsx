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
export const FirstStory = Template.bind({});
FirstStory.args = { text: 'test', backgroundColor: '#ff0000' };
