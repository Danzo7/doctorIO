import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddNewCertificateModal from './AddNewCertificateModal';
export default {
  title: 'MODALS/AddNewCertificateModal',
  component: AddNewCertificateModal,
};
const Template: Story<ComponentProps<typeof AddNewCertificateModal>> = (
  args,
) => <AddNewCertificateModal {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
