import { color } from '@assets/styles/color';
import { ReactNode } from 'react';
import './style/index.scss';
interface HeaderProps {
  title: string;
  buttonNode?: ReactNode;
  alignItems?: string;
  titleFontSize?: number;
  titleFontWeight?: number | string;
  titleColor?: string;
}
export default function Header({
  buttonNode,
  title,
  alignItems = 'baseline',
  titleFontSize = 18,
  titleFontWeight = 600,
  titleColor = color.white,
}: HeaderProps) {
  return (
    <div className="header" css={{ alignItems: alignItems }}>
      <span
        css={{
          fontSize: titleFontSize,
          fontWeight: titleFontWeight,
          color: titleColor,
        }}
      >
        {title}
      </span>
      {buttonNode}
    </div>
  );
}
