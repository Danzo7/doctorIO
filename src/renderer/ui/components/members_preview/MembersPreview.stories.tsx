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
export const FirstStory = Template;
FirstStory.args = {
  name: 'Amanda Clark',
  id: 100,
  status: true,
  avatar: test,
  roles: [{ id: 1, name: 'gamer', description: 'gaming', priority: 1 }],
};
