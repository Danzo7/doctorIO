import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Queues from './Queues';
export default {
  title: 'Queues',
  component: Queues,
};
const Template: Story<ComponentProps<typeof Queues>> = (args) => (
  <Queues {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
