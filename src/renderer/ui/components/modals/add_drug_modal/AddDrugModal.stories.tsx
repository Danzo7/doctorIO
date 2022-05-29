import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddDrugModal from './AddDrugModal';
export default {
  title: 'Modals/AddDrugModal',
  component: AddDrugModal,
};
const Template: Story<ComponentProps<typeof AddDrugModal>> = (args) => (
  <AddDrugModal {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
