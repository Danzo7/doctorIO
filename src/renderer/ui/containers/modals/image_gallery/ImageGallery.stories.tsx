import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ImageGallery from './ImageGallery';
export default {
  title: 'ImageGallery',
  component: ImageGallery,
};
const Template: Story<ComponentProps<typeof ImageGallery>> = (args) => (
  <ImageGallery {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
