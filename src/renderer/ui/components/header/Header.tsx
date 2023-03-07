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
  titleMaxWidth?: number | string;
}
export default function Header({
  buttonNode,
  title,
  alignItems = 'center',
  flexGrow = 0,
  leftComponent,
  padding = '0 5px 0 5px ',
  titleMaxWidth = 500,
}: HeaderProps) {
  return (
    <div
      className="header"
      css={{ alignItems: alignItems, flexGrow: flexGrow, padding: padding }}
    >
      {leftComponent}

      {title && (
        <span
          className="header-title"
          css={{
            fontSize: typeof title != 'string' ? title.fontSize : 18,
            color: typeof title != 'string' ? title.fontColor : color.white,
            fontWeight: typeof title != 'string' ? title.fontWeight : 600,
            maxWidth: titleMaxWidth,
          }}
        >
          {typeof title == 'string' ? title : title.text}
        </span>
      )}
      {buttonNode}
    </div>
  );
}
