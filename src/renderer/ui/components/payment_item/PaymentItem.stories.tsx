import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PaymentItem from './PaymentItem';
export default {
  title: 'payment/PaymentItem',
  component: PaymentItem,
};
const Template: Story<ComponentProps<typeof PaymentItem>> = (args) => (
  <PaymentItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  patientFullName: 'Daouadji Aymen',
  amount: 9000,
};
