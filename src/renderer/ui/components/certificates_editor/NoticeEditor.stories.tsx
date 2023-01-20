import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CertificateEditor from './CertificateEditor';
export default {
  title: 'NoticeEditor',
  component: CertificateEditor,
};
const Template: Story<ComponentProps<typeof CertificateEditor>> = (args) => (
  <CertificateEditor {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
