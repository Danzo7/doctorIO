import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AssistantItem from './AssistantItem';
export default {
  title: 'AssistantItem',
  component: AssistantItem,
};
const Template: Story<ComponentProps<typeof AssistantItem>> = (args) => (
  <AssistantItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
