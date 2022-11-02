import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Joinclinic from './Joinclinic';
export default {
  title: 'Joinclinic',
  component: Joinclinic,
};
const Template: Story<ComponentProps<typeof Joinclinic>> = (args) => (
  <Joinclinic {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
