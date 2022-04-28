import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import InputField, { evolvedTypes } from './InputField';
import search from 'toSvg/search.svg?icon';
import Svg from '@libs/svg';
export default {
  title: 'Inputs/InputField',
  component: InputField,
};
const Template: Story<ComponentProps<typeof InputField>> = (args) => (
  <InputField {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  label: 'hello',
  placeholder: 'search for a patients',
  type: { rawType: 'search', evolvedType: evolvedTypes.dropdown },
  leading: <Svg children={search} />,
  trailing: <Svg children={search} />,
  hintText: 'hello',
};
