import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import QueueItemShimmer from './QueueItemShimmer';
export default {
  title: 'Shimmers/QueueItemShimmer',
  component: QueueItemShimmer,
};
const Template: Story<ComponentProps<typeof QueueItemShimmer>> = (args) => (
  <QueueItemShimmer {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
