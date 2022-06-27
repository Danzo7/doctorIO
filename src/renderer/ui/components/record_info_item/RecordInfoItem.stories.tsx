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
FirstStory.args = { firstName: 'John', patId: 12345679, lastName: 'Doe' };
