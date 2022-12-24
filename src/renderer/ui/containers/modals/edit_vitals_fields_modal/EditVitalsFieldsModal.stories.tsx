import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import EditVitalsFieldsModal from './EditVitalsFieldsModal';
export default {
  title: 'MODALS/EditVitalsFieldsModal',
  component: EditVitalsFieldsModal,
};
const Template: Story<ComponentProps<typeof EditVitalsFieldsModal>> = (
  args,
) => <EditVitalsFieldsModal {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
