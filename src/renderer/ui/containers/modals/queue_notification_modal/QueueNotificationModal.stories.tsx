import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import QueueNotificationModal from './QueueNotificationModal';
export default {
  title: 'QueueNotificationModal',
  component: QueueNotificationModal,
};
const Template: Story<ComponentProps<typeof QueueNotificationModal>> = (
  args,
) => <QueueNotificationModal {...args} />;
export const FirstStory = Template;
FirstStory.args = {
  name: 'john doe',
  position: 5,
};
