import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import QueueControls from './QueueControls';
export default {
  title: 'QueueControls',
  component: QueueControls,
};
const Template: Story<ComponentProps<typeof QueueControls>> = (args) => (
  <QueueControls {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
