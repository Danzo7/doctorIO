import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Mesages from './Mesages';
export default {
  title: 'Contents/Mesages',
  component: Mesages,
};
const Template: Story<ComponentProps<typeof Mesages>> = (args) => (
  <Mesages {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
