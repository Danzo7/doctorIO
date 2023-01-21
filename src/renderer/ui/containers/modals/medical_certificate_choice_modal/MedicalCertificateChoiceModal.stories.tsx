import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MedicalCertificateChoiceModal from './MedicalCertificateChoiceModal';
export default {
  title: 'MODALS/MedicalCertificateChoiceModal',
  component: MedicalCertificateChoiceModal,
};
const Template: Story<ComponentProps<typeof MedicalCertificateChoiceModal>> = (
  args,
) => <MedicalCertificateChoiceModal {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
