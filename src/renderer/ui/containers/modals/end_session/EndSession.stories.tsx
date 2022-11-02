import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import EndSession from './EndSession';
export default {
  title: 'Modals/EndSession',
  component: EndSession,
};
const Template: Story<ComponentProps<typeof EndSession>> = (args) => (
  <EndSession {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
