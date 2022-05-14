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
  numContact: 20,
  contactList: [
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe1',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe2',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe3',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe4',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe5',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe6',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe7',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe8',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe9',
    },
  ],
};
