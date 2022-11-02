import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PaymentQueue from './PaymentQueue';
export default {
  title: 'Payment/PaymentQueue',
  component: PaymentQueue,
};
const Template: Story<ComponentProps<typeof PaymentQueue>> = (args) => (
  <PaymentQueue {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
