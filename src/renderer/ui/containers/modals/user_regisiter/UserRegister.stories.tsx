import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import UserRegister from './UserRegister';
export default {
  title: 'UserRegister',
  component: UserRegister,
};
const Template: Story<ComponentProps<typeof UserRegister>> = (args) => (
  <UserRegister {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
