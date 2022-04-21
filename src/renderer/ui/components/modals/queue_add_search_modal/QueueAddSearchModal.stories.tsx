import React, { ComponentProps } from 'react';
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
FirstStory.args = {
  usersData: [
    {
      fullName: 'brahim aymen',
      age: 24,
    },
    {
      fullName: 'daouadji aymen',
      age: 24,
    },
    {
      fullName: 'amine bou',
      age: 24,
    },
    {
      fullName: 'John Doe',
      age: 24,
    },
  ],
};
