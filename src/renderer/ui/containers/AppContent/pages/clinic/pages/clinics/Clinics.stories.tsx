import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Clinics from './Clinics';
export default {
  title: 'Contents/Clinics',
  component: Clinics,
};
const Template: Story<ComponentProps<typeof Clinics>> = () => <Clinics />;
export const FirstStory = Template;
FirstStory.args = {};
