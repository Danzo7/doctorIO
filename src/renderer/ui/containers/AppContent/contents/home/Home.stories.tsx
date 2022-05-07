import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Home from './Home';
export default {
  title: 'Contents/Home',
  component: Home,
};
const Template: Story<ComponentProps<typeof Home>> = (args) => (
  <Home {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
