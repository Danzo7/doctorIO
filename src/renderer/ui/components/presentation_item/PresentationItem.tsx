/* eslint-disable react/no-children-prop */
import { ReactNode } from 'react';
import './style/index.scss';
interface PresentationItemProps {
  primaryText: string;
  secondaryText?: string;
  children?: ReactNode;
}
export default function PresentationItem({
  primaryText,
  secondaryText,
  children,
}: PresentationItemProps) {
  return (
    <div className="presentation-item">
      <div className="info-container">
        <span>{primaryText}</span>
        <span>{secondaryText}</span>
      </div>
      <div className="controls-container" children={children} />
    </div>
  );
}
