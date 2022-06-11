import { FunctionComponent, ReactNode, SVGProps } from 'react';
import IconicButton from '../iconic_button';
import back from 'toSvg/arrow_line.svg?icon';
import { PressHandler } from '../text_button';

interface SquareIconButtonProps {
  onPress?: PressHandler;
  svg?: FunctionComponent<SVGProps<SVGSVGElement>> | ReactNode;
  blank?: true;
}

function SquareIconButton({ onPress, svg, blank }: SquareIconButtonProps) {
  return (
    <IconicButton
      width={25}
      Icon={svg ?? back}
      backgroundColor="transparent"
      afterBgColor="#ffffff20"
      radius={5}
      onPress={onPress}
      blank={blank}
    />
  );
}

export default SquareIconButton;
