import { FunctionComponent, SVGProps } from 'react';
import TextButton, { PressHandler } from '../text_button';
import './style/index.scss';

interface TextIconButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  text: string;
  color?: string;
  onPress?: PressHandler;
}

function TextIconButton({ Icon, text, color, onPress }: TextIconButtonProps) {
  return (
    <div className="text-icon-button">
      <TextButton backgroundColor={color} onPress={onPress}>
        <span>{text}</span>
        {<Icon />}
      </TextButton>
    </div>
  );
}

export default TextIconButton;
