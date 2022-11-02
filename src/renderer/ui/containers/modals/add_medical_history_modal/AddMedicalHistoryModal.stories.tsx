import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddMedicalHistoryModal from './AddMedicalHistoryModal';
export default {
  title: 'Modals/AddMedicalHistoryModal',
  component: AddMedicalHistoryModal,
};
const Template: Story<ComponentProps<typeof AddMedicalHistoryModal>> = (
  args,
) => <AddMedicalHistoryModal {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
