import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberStatus from './MemberStatus';
export default {
  title: 'Chat/MemberStatus',
  component: MemberStatus,
};
const Template: Story<ComponentProps<typeof MemberStatus>> = (args) => (
  <MemberStatus {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  memberFullName: 'Dr therapist',
};
