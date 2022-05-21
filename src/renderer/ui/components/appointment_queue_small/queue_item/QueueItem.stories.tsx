// YourComponent.stories.tsx

import { ComponentProps } from 'react';

import type { Story } from '@storybook/react';

import QueueItem from './QueueItem';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'queue/QueueItem',
  component: QueueItem,
  argTypes: {
    state: { type: 'select', options: ['urgent', 'normal'] },
  },
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof QueueItem>> = (args) => (
  <QueueItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  name: 'adam smith',
  number: 1,
  timeAgo: 'created 1h ago',
};
