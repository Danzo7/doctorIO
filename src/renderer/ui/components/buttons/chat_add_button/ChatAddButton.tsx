import IconicButton from '@components/buttons/iconic_button';
import './style/index.scss';
import Add from 'toSvg/add.svg?icon';
import { color } from '@assets/styles/color';
import { ComponentProps } from 'react';
export default function ChatAddButton(
  props: Omit<
    ComponentProps<typeof IconicButton>,
    'backgroundColor' | 'width' | 'padding' | 'radius' | 'Icon' | 'iconSize'
  >,
) {
  return (
    <div className="chat-add-button">
      <IconicButton
        Icon={Add}
        backgroundColor={color.cold_blue}
        radius={100}
        iconSize={10}
        width={25}
        {...props}
      />
    </div>
  );
}
