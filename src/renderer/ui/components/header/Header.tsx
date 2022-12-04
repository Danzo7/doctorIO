import { color } from '@assets/styles/color';
import { ReactNode } from 'react';
import './style/index.scss';
interface HeaderProps {
  title?:
    | string
    | {
        text: string;
        fontSize?: number;
        fontColor?: string;
        fontWeight?: string | number;
      };
  leftComponent?: ReactNode;
  buttonNode?: ReactNode;
  alignItems?: string;
  titleColor?: string;
  flexGrow?: number;
  padding?: number | string;
}
export default function Header({
  buttonNode,
  title,
  alignItems = 'baseline',
  flexGrow = 0,
  leftComponent,
  padding,
}: HeaderProps) {
  return (
    <div
      className="header"
      css={{ alignItems: alignItems, flexGrow: flexGrow, padding: padding }}
    >
      {leftComponent}

      {title && (
        <span
          css={{
            fontSize: typeof title != 'string' ? title.fontSize : 18,
            color: typeof title != 'string' ? title.fontColor : color.white,
            fontWeight: typeof title != 'string' ? title.fontWeight : 600,
          }}
        >
          {typeof title == 'string' ? title : title.text}
        </span>
      )}
      {buttonNode}
    </div>
  );
}
