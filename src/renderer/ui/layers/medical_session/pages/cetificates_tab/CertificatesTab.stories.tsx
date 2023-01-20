import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CertificatesTab from './CertificatesTab';
export default {
  title: 'CertificatesTab',
  component: CertificatesTab,
};
const Template: Story<ComponentProps<typeof CertificatesTab>> = (args) => (
  <CertificatesTab />
);
export const FirstStory = Template;
FirstStory.args = {};
