import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NextPatient from './NextPatient';
export default {
  title: 'Modals/NextPatient',
  component: NextPatient,
};
const Template: Story<ComponentProps<typeof NextPatient>> = (args) => (
  <NextPatient {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
