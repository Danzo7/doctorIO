import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberBigCard from './MemberBigCard';
import { members } from '@api/fake';

export default {
  title: 'Modals/MemberBigCard',
  component: MemberBigCard,
};
const Template: Story<ComponentProps<typeof MemberBigCard>> = (args) => (
  <MemberBigCard {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = members[0];
