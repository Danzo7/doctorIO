import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CertificatesView from './CertificatesView';
export default {
  title: 'CertificatesView',
  component: CertificatesView,
};
const Template: Story<ComponentProps<typeof CertificatesView>> = (args) => (
  <CertificatesView {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
