import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ContactTabMenu from './ContactTabMenu';
import Doctor from 'toSvg/doctor_icon.svg?icon';
export default {
  title: 'Contact/ContactTabMenu',
  component: ContactTabMenu,
};
const Template: Story<ComponentProps<typeof ContactTabMenu>> = (args) => (
  <ContactTabMenu {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  messagesCategoryIcon: Doctor,
  messagesCategoryName: 'Clinic',
};
