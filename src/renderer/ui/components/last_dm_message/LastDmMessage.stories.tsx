import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import LastDmMessage from './LastDmMessage';
import { MemoryRouter } from 'react-router-dom';
import { AVATAR_DEFAULT } from '@constants/resources';
export default {
  title: 'LastDmMessage',
  component: LastDmMessage,
};
const Template: Story<ComponentProps<typeof LastDmMessage>> = (args) => (
  <MemoryRouter>
    <LastDmMessage {...args} />
  </MemoryRouter>
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  avatar: AVATAR_DEFAULT,
  status: true,
  id: 1,
  lastMessage: { date: new Date(), text: 'Hello', seen: false },
};
