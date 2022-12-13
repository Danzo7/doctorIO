import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CropPictureModal from './CropPictureModal';
export default {
  title: 'MODALS/CropPictureModal',
  component: CropPictureModal,
};
const Template: Story<ComponentProps<typeof CropPictureModal>> = (args) => (
  <CropPictureModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  src: 'https://www.aps.dz/media/k2/items/cache/2759169c4441c99b9a3aa6969fc2e796_L.jpg',
};
