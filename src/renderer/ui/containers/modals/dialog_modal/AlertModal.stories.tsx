import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AlertModal from './AlertModal';
import TextButton from '@components/buttons/text_button';
import color from '@assets/styles/color';
export default {
  title: 'Modals/DialogModal',
  component: AlertModal,
};
const Template: Story<ComponentProps<typeof AlertModal>> = (args) => (
  <AlertModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  title: 'You have been disconnected',
  description:
    'You have been disconnected due to suspicious activities. You need to provide your secret key to gain access to your account again.',
  controls: (
    <>
      <TextButton text="confirm" backgroundColor={color.good_green} />
      <TextButton text="confirm" backgroundColor={color.hot_red} />
    </>
  ),
};
