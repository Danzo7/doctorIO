import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MembersPreview from './MembersPreview';
import test from 'toPng/test.png';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'MembersPreview',
  component: MembersPreview,
};
const Template: Story<ComponentProps<typeof MembersPreview>> = (args) => (
  <MembersPreview {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  fullName: 'Amanda Clark',
  memberID: '100',
  status: 'Online',
  imgSrc: test,
  roleArray: [
    'Gamer',
    'Assistant',
    'Assistant',
    'Assistant',
    'Assistant',
    'Assistant',
    'Assistant',
    'Assistant',
    'Assistant',
  ],
};
