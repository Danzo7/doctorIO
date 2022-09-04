import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberMiniCard from './MemberMiniCard';
export default {
  title: 'MemberMiniCard',
  component: MemberMiniCard,
};
const Template: Story<ComponentProps<typeof MemberMiniCard>> = (args) => (
  <MemberMiniCard {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
