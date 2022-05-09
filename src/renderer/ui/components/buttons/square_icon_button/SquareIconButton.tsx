import { FunctionComponent, SVGProps } from 'react';
import IconicButton from '../iconic_button';
import back from 'toSvg/arrow_line.svg?icon';

interface SquareIconButtonProps {
  onPress?: () => void;
  svg?: FunctionComponent<SVGProps<SVGSVGElement>>;
}

function SquareIconButton({ onPress, svg }: SquareIconButtonProps) {
  return (
    <IconicButton
      width={25}
      Icon={svg ?? back}
      backgroundColor="transparent"
      afterColor="#ffffff20"
      radius={5}
      onPress={onPress}
    />
  );
}

export default SquareIconButton;
