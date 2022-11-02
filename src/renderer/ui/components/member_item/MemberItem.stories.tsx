import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberItem from './MemberItem';
import test from 'toPng/test.png';
export default {
  title: 'MemberItem',
  component: MemberItem,
};
const Template: Story<ComponentProps<typeof MemberItem>> = (args) => (
  <MemberItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  avatar: test,
  status: true,
  name: 'Aymen Daouadji',
  id: 123456789,
  roles: [{ id: 1, name: 'gamer', description: 'gaming', priority: 1 }],
  joinDate: new Date('2022-01-01'),
};
