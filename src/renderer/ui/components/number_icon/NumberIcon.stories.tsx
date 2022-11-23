import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NumberIcon from './NumberIcon';
export default {
  title: 'NumberIcon',
  component: NumberIcon,
};
const Template: Story<ComponentProps<typeof NumberIcon>> = (args) => (
  <NumberIcon {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  value: 5,
};
