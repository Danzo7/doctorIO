import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ContactList from './ContactList';
import profile from '@assets/pictures/test.png';
export default {
  title: 'Contact/ContactList',
  component: ContactList,
};
const Template: Story<ComponentProps<typeof ContactList>> = (args) => (
  <ContactList {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  contactType: 'ONLINE',
};