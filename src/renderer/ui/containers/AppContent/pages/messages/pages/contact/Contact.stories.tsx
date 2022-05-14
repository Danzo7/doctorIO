import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Contact from './Contact';
export default {
  title: 'Contact/Contact',
  component: Contact,
};
const Template: Story<ComponentProps<typeof Contact>> = (args) => (
  <Contact {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
