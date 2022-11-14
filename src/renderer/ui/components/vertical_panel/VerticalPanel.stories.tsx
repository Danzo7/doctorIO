import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import VerticalPanel from './VerticalPanel';
import LogOut from 'toSvg/logOut.svg?icon';
import Loading from 'toSvg/loading_logo.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
export default {
  title: 'VerticalPanel',
  component: VerticalPanel,
};
const Template: Story<ComponentProps<typeof VerticalPanel>> = (args) => (
  <VerticalPanel {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  title: 'This is the title',
  description: 'Trying to reconnect back to the server.',
  Icon: <Loading />,
  action: { text: 'Refresh the page' },
  IconBtn: <SquareIconButton Icon={LogOut} />,
};
