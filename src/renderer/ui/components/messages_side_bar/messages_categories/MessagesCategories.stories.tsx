import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MessagesCategories from './MessagesCategories';
import Doctor from 'toSvg/doctor_icon.svg?icon';
import Nurse from 'toSvg/nurse_icon.svg?icon';
export default {
  title: 'MessagesSideBar/MessagesCategories',
  component: MessagesCategories,
};
const Template: Story<ComponentProps<typeof MessagesCategories>> = (args) => (
  <MessagesCategories {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  categories: [
    {
      Icon: Doctor,
      categoryName: 'Clinic',
    },
    {
      Icon: Nurse,
      categoryName: 'Public',
    },
  ],
};
