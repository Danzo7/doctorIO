import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ImageViewer from './ImageViewer';
export default {
  title: 'ImageViewer',
  component: ImageViewer,
};
const Template: Story<ComponentProps<typeof ImageViewer>> = (args) => (
  <ImageViewer {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
