import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import LoadingModal from './LoadingModal';
import GoodMark from 'toSvg/good_mark.svg?icon';
export default {
  title: 'Modals/LoadingModal',
  component: LoadingModal,
};
const Template: Story<ComponentProps<typeof LoadingModal>> = (args) => (
  <LoadingModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  Icon: GoodMark,
  title: 'Reconnicting...',
  description: 'Trying to reconnect back to the server',
};
