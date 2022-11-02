import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MedicalSessionSideBar from './MedicalSessionSideBar';
export default {
  title: 'MedicalSessionSideBar',
  component: MedicalSessionSideBar,
};
const Template: Story<ComponentProps<typeof MedicalSessionSideBar>> = (
  args,
) => <MedicalSessionSideBar {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
