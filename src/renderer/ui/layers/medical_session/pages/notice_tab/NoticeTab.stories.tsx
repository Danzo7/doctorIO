import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NoticeTab from './NoticeTab';
export default {
  title: 'NoticeTab',
  component: NoticeTab,
};
const Template: Story<ComponentProps<typeof NoticeTab>> = (args) => (
  <NoticeTab />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
