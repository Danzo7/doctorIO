import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import QueueAddSearchModal from './QueueAddSearchModal';
export default {
  title: 'Modals/QueueAddSearchModal',
  component: QueueAddSearchModal,
};
const Template: Story<ComponentProps<typeof QueueAddSearchModal>> = (args) => (
  <QueueAddSearchModal {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
