import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Backdrop from './Backdrop';
export default {
  title: 'Backdrop',
  component: Backdrop,
};
const Template: Story<ComponentProps<typeof Backdrop>> = (args) => (
  <Backdrop {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
