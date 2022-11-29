import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import StatusIcon from './StatusIcon';
export default {
  title: 'StatusIcon',
  component: StatusIcon,
};
const Template: Story<ComponentProps<typeof StatusIcon>> = (args) => (
  <StatusIcon {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
