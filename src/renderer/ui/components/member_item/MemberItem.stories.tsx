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
export const FirstStory = Template.bind({});
FirstStory.args = {
  avatar: test,
  memberStatus: true,
  name: 'Aymen Daouadji',
  memberId: 123456789,
  roles: [{ roleId: 1, roleName: 'gamer', roleDesc: 'gaming' }],
  joinDate: new Date('2022-01-01'),
};
