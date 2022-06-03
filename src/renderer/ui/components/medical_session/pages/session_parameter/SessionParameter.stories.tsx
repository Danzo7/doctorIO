import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SessionParameter from './SessionParameter';
export default {
  title: 'SessionParameter',
  component: SessionParameter,
};
const Template: Story<ComponentProps<typeof SessionParameter>> = (args) => (
  <SessionParameter {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
