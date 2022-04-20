import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ContactItem from './ContactItem';
import profile from '@assets/pictures/test.png';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'ContactItem',
  component: ContactItem,
};
const Template: Story<ComponentProps<typeof ContactItem>> = (args) => (
  <ContactItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  status: true,
  imgSrc: profile,
  fullName: 'John Doe',
};
