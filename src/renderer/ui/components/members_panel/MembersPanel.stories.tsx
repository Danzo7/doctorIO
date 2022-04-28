import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MembersPanel from './MembersPanel';
import test from 'toPng/test.png';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'MembersPanel',
  component: MembersPanel,
};
const Template: Story<ComponentProps<typeof MembersPanel>> = (args) => (
  <MembersPanel {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  membersList: [
    {
      fullName: 'Amanda clarck',
      imgSrc: test,
      memberID: '100',
      status: 'Online',
      roleArray: ['Gamer', 'Assistant', 'Assistant', 'Assistant'],
    },
    {
      fullName: 'Amanda clarck',
      imgSrc: test,
      memberID: '100',
      status: 'Online',
      roleArray: ['Gamer', 'Assistant', 'Assistant', 'Assistant'],
    },
    {
      fullName: 'Amanda clarck',
      imgSrc: test,
      memberID: '100',
      status: 'Online',
      roleArray: ['Gamer', 'Assistant', 'Assistant', 'Assistant'],
    },
    {
      fullName: 'Amanda clarck',
      imgSrc: test,
      memberID: '100',
      status: 'Online',
      roleArray: ['Gamer', 'Assistant', 'Assistant', 'Assistant'],
    },
    {
      fullName: 'Amanda clarck',
      imgSrc: test,
      memberID: '100',
      status: 'Online',
      roleArray: ['Gamer', 'Assistant', 'Assistant', 'Assistant'],
    },
    {
      fullName: 'Amanda clarck',
      imgSrc: test,
      memberID: '100',
      status: 'Online',
      roleArray: ['Gamer', 'Assistant', 'Assistant', 'Assistant'],
    },
    {
      fullName: 'Amanda clarck',
      imgSrc: test,
      memberID: '100',
      status: 'Online',
      roleArray: ['Gamer', 'Assistant', 'Assistant', 'Assistant'],
    },
    {
      fullName: 'Amanda clarck',
      imgSrc: test,
      memberID: '100',
      status: 'Online',
      roleArray: ['Gamer', 'Assistant', 'Assistant', 'Assistant'],
    },
  ],
};
