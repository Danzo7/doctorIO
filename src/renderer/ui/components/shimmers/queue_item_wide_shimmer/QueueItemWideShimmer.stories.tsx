import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import QueueItemWideShimmer from './QueueItemWideShimmer';
export default {
  title: 'Shimmers/QueueItemWideShimmer',
  component: QueueItemWideShimmer,
};
const Template: Story<ComponentProps<typeof QueueItemWideShimmer>> = (args) => (
  <QueueItemWideShimmer {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
