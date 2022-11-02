import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CurrentPatient from './CurrentPatient';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'CurrentPatient',
  component: CurrentPatient,
};
const Template: Story<ComponentProps<typeof CurrentPatient>> = (args) => (
  <CurrentPatient {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  fullName: 'John Doe',
  age: 15,
};
