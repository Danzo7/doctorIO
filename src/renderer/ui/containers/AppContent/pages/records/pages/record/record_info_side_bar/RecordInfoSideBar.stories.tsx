import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RecordInfoSideBar from './RecordInfoSideBar';
export default {
  title: 'RecordInfoSideBar',
  component: RecordInfoSideBar,
};
const Template: Story<ComponentProps<typeof RecordInfoSideBar>> = (args) => (
  <RecordInfoSideBar {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
