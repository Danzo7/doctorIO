import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ContactTabMenu from './ContactTabMenu';
export default {
  title: 'Contact/ContactTabMenu',
  component: ContactTabMenu,
};
const Template: Story<ComponentProps<typeof ContactTabMenu>> = (args) => (
  <ContactTabMenu {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
