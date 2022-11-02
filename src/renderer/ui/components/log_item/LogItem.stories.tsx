import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import LogItem from './LogItem';
export default {
  title: 'LogItem',
  component: LogItem,
};
const Template: Story<ComponentProps<typeof LogItem>> = (args) => (
  <LogItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  actionDispatcher: 'Aymen Daouadji',
  id: '123456789',
  logTime: '22 Jan at 23:00',
  actionName: 'Add a member',
  actionTo: 'Professor#12346566',
};
