import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PatientSmallCard from './PatientSmallCard';
export default {
  title: 'PatientSmallCard',
  component: PatientSmallCard,
};
const Template: Story<ComponentProps<typeof PatientSmallCard>> = (args) => (
  <PatientSmallCard {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  age: 20,
  firstName: 'John',
  lastName: 'Doe',
  patId: 1,
};
