import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberBigCard from './MemberBigCard';

export default {
  title: 'Modals/MemberBigCard',
  component: MemberBigCard,
};
const Template: Story<ComponentProps<typeof MemberBigCard>> = (args) => (
  <MemberBigCard {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  name: 'Aymen Daouadji',
  avatar: 'build/renderer/assets/9b4caf44c40506a102ec.png',
  memberStatus: true,
  accessKey: '12346678',
  addedBy: 'Brahim aymen',
  age: 18,
  gender: 'Men',
  address: 'blida',
  userId: 12346789,
  phoneNumber: '054681349',
  memberId: 123456789,
  roles: [{ roleId: 1, roleName: 'gamer', roleDesc: 'gaming' }],
  joinDate: new Date('2022-01-01'),
};
