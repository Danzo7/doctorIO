import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NoticeEditor from './NoticeEditor';
export default {
  title: 'NoticeEditor',
  component: NoticeEditor,
};
const Template: Story<ComponentProps<typeof NoticeEditor>> = (args) => (
  <NoticeEditor {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
