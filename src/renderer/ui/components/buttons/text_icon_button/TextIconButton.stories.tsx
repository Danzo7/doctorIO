import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TextIconButton from './TextIconButton';
import invite from 'toSvg/invitePatientIn.svg?icon';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/TextIconButton',
  component: TextIconButton,
};
const Template: Story<ComponentProps<typeof TextIconButton>> = (args) => (
  <TextIconButton {...args} />
);
export const primary = Template.bind({});
primary.args = {
  Icon: invite,
  text: 'invite in',
};
