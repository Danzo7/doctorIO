import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Alert from './AlertToast';
export default {
  title: 'Modals/Alert',
  component: Alert,
};
const Template: Story<ComponentProps<typeof Alert>> = (args) => (
  <Alert {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  text: 'Something went wrong',
};
