import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Data from './Data';
export default {
  title: 'Data',
  component: Data,
};
const Template: Story<ComponentProps<typeof Data>> = (args) => (
  <Data {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
