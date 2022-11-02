import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ModalContainer from './ModalContainer';
export default {
  title: 'MODALS/ModalContainer',
  component: ModalContainer,
};
const Template: Story<ComponentProps<typeof ModalContainer>> = (args) => (
  <ModalContainer {...args} />
);
export const FirstStory = Template;
FirstStory.args = { title: 'tewt' };
