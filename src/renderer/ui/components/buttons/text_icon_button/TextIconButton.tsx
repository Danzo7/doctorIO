import { FunctionComponent, SVGProps } from 'react';
import './style/index.scss';

interface TextIconButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  text: string;
  color?: string;
  startFocus?: boolean;
  id?: number;
  onMouseOver?: (a: number) => void;
  onPress?: () => void;
}

function TextIconButton({
  Icon,
  text,
  color,
  startFocus,
  onMouseOver,
  onPress,
  id,
}: TextIconButtonProps) {
  return (
    <div
      onClick={onPress}
      onMouseEnter={() =>
        id != undefined && onMouseOver != undefined
          ? onMouseOver(id)
          : undefined
      }
      className={`text-icon-button${startFocus ? ' active' : ''}`}
      css={{ backgroundColor: color }}
    >
      <div className="text">
        <span>{text}</span>
      </div>
      {Icon && <Icon />}
    </div>
  );
}

export default TextIconButton;
