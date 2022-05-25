import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Input from './Input';
import IconicButton from '@components/buttons/iconic_button';
import search from 'toSvg/search.svg?icon';
import { color } from '@assets/styles/color';
import Select from '../select';
export default {
  title: 'inputs/Input',
  component: Input,
};
const Template: Story<ComponentProps<typeof Input>> = (args) => (
  <Input {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  hint: 'hello',
  label: 'name',
  placeholder: 'username',
  type: 'url',
  leading: (
    <IconicButton
      Icon={search}
      backgroundColor={color.cold_blue}
      width={25}
      iconSize={10}
    />
  ),
  trailing: <Select options={['.exe', '.svg']} placeholder="type" width={80} />,
};
