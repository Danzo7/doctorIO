import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import WarningModal from './WarningModal';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
export default {
  title: 'MODALS/WarningModal',
  component: WarningModal,
};
const Template: Story<ComponentProps<typeof WarningModal>> = (args) => (
  <WarningModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  title: '(warningTitle)',
  description: '(warningDescription)',
  children: (
    <>
      <TextButton text="Confirm" backgroundColor={color.hot_red} width="100%" />
      <TextButton
        text="Confirm"
        backgroundColor={color.cold_blue}
        width="100%"
      />
    </>
  ),
};
