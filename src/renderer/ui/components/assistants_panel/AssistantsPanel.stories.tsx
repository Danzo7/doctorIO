import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AssistantsPanel from './AssistantsPanel';
export default {
  title: 'AssistantsPanel',
  component: AssistantsPanel,
};
const Template: Story<ComponentProps<typeof AssistantsPanel>> = (args) => (
  <AssistantsPanel {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
