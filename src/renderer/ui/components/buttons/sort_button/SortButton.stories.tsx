import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SortButton from './SortButton';
export default {
  title: 'SortButton',
  component: SortButton,
};
const Template: Story<ComponentProps<typeof SortButton>> = (args) => (
  <SortButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = { title: 'Action' };
