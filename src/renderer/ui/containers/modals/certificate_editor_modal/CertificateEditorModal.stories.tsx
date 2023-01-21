import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CertificateEditorModal from './CertificateEditorModal';
export default {
  title: 'MODALS/CertificateEditorModal',
  component: CertificateEditorModal,
};
const Template: Story<ComponentProps<typeof CertificateEditorModal>> = (
  args,
) => <CertificateEditorModal {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
