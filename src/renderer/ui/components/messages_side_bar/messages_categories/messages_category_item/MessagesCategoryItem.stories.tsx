import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MessagesCategoryItem from './MessagesCategoryItem';
import Doctor from 'toSvg/doctor_icon.svg?icon';
export default {
  title: 'MessagesSideBar/MessagesCategoryItem',
  component: MessagesCategoryItem,
};
const Template: Story<ComponentProps<typeof MessagesCategoryItem>> = (args) => (
  <MessagesCategoryItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  Icon: Doctor,
  categoryName: 'Clinic',
};
