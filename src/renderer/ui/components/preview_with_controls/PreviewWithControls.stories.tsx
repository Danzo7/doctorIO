import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PreviewWithControls from './PreviewWithControls';
export default {
  title: 'PreviewWithControls',
  component: PreviewWithControls,
};
const Template: Story<ComponentProps<typeof PreviewWithControls>> = (args) => (
  <PreviewWithControls {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  primaryText: '28 Feb 2021',
  secondaryText: 'Sick from eating flesh',
};
