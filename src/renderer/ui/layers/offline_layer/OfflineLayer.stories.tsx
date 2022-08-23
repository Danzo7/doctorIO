import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import OfflineLayer from './OfflineLayer';
export default {
  title: 'OfflineLayer',
  component: OfflineLayer,
};
const Template: Story<ComponentProps<typeof OfflineLayer>> = (args) => (
  <OfflineLayer {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
