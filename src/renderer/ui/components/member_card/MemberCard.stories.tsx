import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberCard from './MemberCard';
import test from 'toPng/test.png';
export default {
  title: 'MemberCard',
  component: MemberCard,
};
const Template: Story<ComponentProps<typeof MemberCard>> = (args) => (
  <MemberCard {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  fullName: 'Amanda Clark',
  imgSrc: test,
  roleArray: ['Gamer', 'Assistant'],
};
