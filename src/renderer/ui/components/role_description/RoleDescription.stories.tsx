import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RoleDescription from './RoleDescription';
export default {
  title: 'RoleDescription',
  component: RoleDescription,
};
const Template: Story<ComponentProps<typeof RoleDescription>> = (args) => (
  <RoleDescription {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  name: 'Support',
  description:
    'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh brahim aymen hhhhhhhhhhhhhhhhhhhhhhhhhhhh daouadji aymen',
};
