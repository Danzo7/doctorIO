import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ReusableCertificatesModal from './ReusableCertificatesModal';
export default {
  title: 'MODALS/ReusableCertificatesModal',
  component: ReusableCertificatesModal,
};
const Template: Story<ComponentProps<typeof ReusableCertificatesModal>> = (
  args,
) => <ReusableCertificatesModal {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
