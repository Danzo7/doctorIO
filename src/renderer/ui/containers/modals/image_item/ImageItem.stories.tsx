import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ImageItem from './ImageItem';
import profile from '@assets/pictures/test.png';

export default {
  title: 'ImageItem',
  component: ImageItem,
};
const Template: Story<ComponentProps<typeof ImageItem>> = (args) => (
  <ImageItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = { url: profile, alt: 'profile' };
