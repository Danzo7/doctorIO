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
  status: true,
  fullName: 'John White',
  id: '123456789',
  age: 19,
  gender: 'Men',
  PhoneNumber: '0545967318',
  Address: 'Blida',
  JoinDate: '02/02/2022',
  AddedBy: 'Brahim Aymen',
  roleArray: ['Gamer', 'Cool', 'Assistant'],
};
