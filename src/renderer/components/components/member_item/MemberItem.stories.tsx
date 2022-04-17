import React, { ComponentProps } from 'react';
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
  memberImgSrc: test,
  memberStatus: true,
  memberFullName: 'Aymen Daouadji',
  memberID: '@mohamed#2000',
  roleArray: [
    'Gamer',
    'Assistant',
    'Assistant',
    'Assistant',
    'Assistant',
    'Assistant',
    'Assistant',
    'Assistant',
  ],
  timeAdded: '28 Feb 2021',
};
