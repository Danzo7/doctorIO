import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberActionControls from './MemberActionControls';
export default {
  title: 'MemberActionControls',
  component: MemberActionControls,
};
const Template: Story<ComponentProps<typeof MemberActionControls>> = (args) => (
  <MemberActionControls {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  member: {
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
  },
};
