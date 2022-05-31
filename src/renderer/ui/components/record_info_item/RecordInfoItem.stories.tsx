import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RecordInfoItem from './RecordInfoItem';
export default {
  title: 'RecordInfoItem',
  component: RecordInfoItem,
};
const Template: Story<ComponentProps<typeof RecordInfoItem>> = (args) => (
  <RecordInfoItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = { fullName: 'John Doe', id: '#12345679' };
