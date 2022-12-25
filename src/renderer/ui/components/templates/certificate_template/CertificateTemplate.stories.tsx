import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CertificateTemplate from './CertificateTemplate';
export default {
  title: 'TEMPLATE/CertificateTemplate',
  component: CertificateTemplate,
};
const Template: Story<ComponentProps<typeof CertificateTemplate>> = (args) => (
  <CertificateTemplate {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
