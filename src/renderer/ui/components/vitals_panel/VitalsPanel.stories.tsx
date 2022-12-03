import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import VitalsPanel from './VitalsPanel';
export default {
  title: 'VitalsPanel',
  component: VitalsPanel,
};
const Template: Story<ComponentProps<typeof VitalsPanel>> = (args) => (
  <VitalsPanel {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
