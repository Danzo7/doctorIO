import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberCard from './MemberCard';
import { members } from '@api/fake';
export default {
  title: 'MemberCard',
  component: MemberCard,
};
const Template: Story<ComponentProps<typeof MemberCard>> = (args) => (
  <MemberCard {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  member: members[0],
};
