import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PresentationItem from './PresentationItem';
import TextButton from '@components/buttons/text_button';
import color from '@assets/styles/color';
export default {
  title: 'PresentationItem',
  component: PresentationItem,
};
const Template: Story<ComponentProps<typeof PresentationItem>> = (args) => (
  <PresentationItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  primaryText: 'John Doe',
  secondaryText: 'Age 18',
  children: (
    <>
      <TextButton
        text="Run diagnosis..."
        backgroundColor={color.cold_blue}
        radius={7}
      />
      <TextButton text="Add" backgroundColor={color.good_green} radius={7} />
    </>
  ),
};
